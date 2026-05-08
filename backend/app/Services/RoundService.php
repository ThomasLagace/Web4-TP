<?php

namespace App\Services;

use App\Models\Game;
use App\Models\Round;
use App\Models\Tournament;
use Illuminate\Database\Eloquent\Collection;

class RoundService
{
    public function __construct (private NewsService $newsService, private PairingService $pairingService) {}

    /**
     * Creation of every round for a given tournament
     * @param Tournament $tournament
     * @return mixed
     */
    public function createRoundsForTournament (Tournament $tournament) {

        $data = [
            ['name' => 'Round 1', 'points_multiplier' => 1, 'status' => 'started', 'tournament_id' => $tournament->id],
            ['name' => 'Round 2', 'points_multiplier' => 2, 'status' => 'pending', 'tournament_id' => $tournament->id],
            ['name' => 'Demi-finale', 'points_multiplier' => 3, 'status' => 'pending', 'tournament_id' => $tournament->id],
            ['name' => 'Finale', 'points_multiplier' => 5, 'status' => 'pending', 'tournament_id' => $tournament->id],
        ];
        foreach ($data as $d) Round::create($d);

        return $tournament->fresh()->rounds;
    }

    /**
     * Creation of every game for every round of a given collection
     * @param Collection $rounds
     * @return void
     */
    public function createGamesForRounds (Collection $rounds, Tournament $tournament) {

        $players = $this->pairingService->getPlayersLeft($tournament);

        foreach ($rounds as $index => $round) {
            $gamesCount = match($index) {
                0 => 8,
                1 => 4,
                2 => 2,
                3 => 1,
            };

            for ($i = 0; $i < $gamesCount; $i++)
            {
                if ($gamesCount == 8) {
                    $game = Game::create([
                        'start_time' => now(),
                        'status' => 'started',
                        'round_id' => $round->id
                    ]);
                    $twoPlayers = $this->pairingService->pairPlayers($players, $game);
                    $players = $players->diff($twoPlayers);
                } else {
                    Game::create(['status' => 'pending', 'round_id' => $round->id]);
                }
            }
        }
    }

    /**
     * Change the active round of the tournament for the next one
     * @param Game $game
     * @return string
     */
    public function changeRound (Game $game) {

        $game->load(['whitePlayer', 'blackPlayer', 'winnerPlayer', 'round.tournament']);
        $roundToStart = Round::where('tournament_id', $game->round->tournament->id)
                            ->where('status', 'pending')
                            ->orderBy('id')
                            ->first();

        $playersLeft = $this->pairingService->getPlayersLeft($game->round->tournament);

        if ($roundToStart === null || $playersLeft->count() <= 1) {
            return "tournament ended";
        } else {
            $gamesToUpdate = $roundToStart->games()->get();

            foreach ($gamesToUpdate as $gameToUpd) {
                $twoPlayers = $this->pairingService->pairPlayers($playersLeft, $gameToUpd);
                $gameToUpd->update(['start_time' => now()]);
                $playersLeft = $playersLeft->diff($twoPlayers);
            }

            $roundToStart->update(['status' => 'started']);
            $this->newsService->endRoundNews($game, $roundToStart);
            return "round changed";
        }
    }
}
