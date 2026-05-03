<?php

namespace App\Services;

use App\Models\Game;
use App\Models\Player;
use App\Models\Round;
use App\Models\Tournament;
use Illuminate\Database\Eloquent\Collection;

class RoundService
{
    public function __construct (private NewsService $newsService, private PairingService $pairingService) {}

    public function createRoundsForTournament (Tournament $tournament) {

        $rounds = Round::with('tournament')->get();

        if ($rounds->isEmpty())
        {
            $data = [
                ['name' => 'Round 1', 'points_multiplier' => 1, 'status' => 'started', 'tournament_id' => $tournament->id],
                ['name' => 'Round 2', 'points_multiplier' => 2, 'status' => 'pending', 'tournament_id' => $tournament->id],
                ['name' => 'Demi-finale', 'points_multiplier' => 3, 'status' => 'pending', 'tournament_id' => $tournament->id],
                ['name' => 'Finale', 'points_multiplier' => 5, 'status' => 'pending', 'tournament_id' => $tournament->id],
            ];

            foreach ($data as $d) {
                Round::create($d);
            }
        }
        else
        {
            foreach ($rounds as $index => $round) {
                $round->update(['status' => $index === 0 ? "started" : "pending", 'tournament_id' => $tournament->id]);
            }
        }

        return $tournament->fresh()->rounds;
    }

    public function createGamesForRounds (Collection $rounds) {

        $players = Player::with(['rank', 'tournament'])->get();

        foreach ($rounds as $index => $round) {
            $gamesCount = match($index) {
                0 => 8,
                1 => 4,
                2 => 2,
                3 => 1,
            };

            if ($gamesCount == 8)
            {
                for ($i = 0; $i < $gamesCount; $i++)
                {
                    $game = Game::create([
                        'start_time' => now(),
                        'status' => 'started',
                        'round_id' => $round->id
                    ]);

                    $twoPlayers = $this->pairingService->pairPlayers($players, $round, $game);

                    $players = $players->diff($twoPlayers);
                }
            }
            else
            {
                for ($i = 0; $i < $gamesCount; $i++)
                {
                    Game::create(['start_time' => now(), 'status' => 'pending', 'round_id' => $round->id]);
                }
            }
        }
    }

    public function changeRound (Game $game, Round $round) {

        $game->load(['whitePlayer', 'blackPlayer', 'winnerPlayer']);
        $roundToStart = Round::where('id', $round->id + 1)->first();
        $playersLeft = $this->pairingService->getPlayersLeft();

        if ($roundToStart === null || $playersLeft->count() <= 1) {
            return "tournament ended";
        } else {
            $gamesToUpdate = $roundToStart->games()->get();
            foreach ($gamesToUpdate as $gameToUpd) {
                $twoPlayers = $this->pairingService->pairPlayers($playersLeft, $round, $gameToUpd);
                $playersLeft = $playersLeft->diff($twoPlayers);
            }

            $roundToStart->update(['status' => 'started']);

            $this->newsService->endRoundNews($game, $roundToStart);

            return "round changed";
        }
    }
}
