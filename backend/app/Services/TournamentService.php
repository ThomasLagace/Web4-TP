<?php

namespace App\Services;

use App\Models\Game;
use App\Models\Player;
use App\Models\Round;
use App\Models\Tournament;
use Illuminate\Support\Collection;

class TournamentService
{
    public function createTournament(array $tournament) : Tournament
    {
        $tournament = Tournament::create($tournament);

        $rounds = Round::with('tournament')->getFirst();

        if ($rounds->isEmpty())
        {
            $data = [
                ['name' => 'Round 1', 'points_multiplier' => 1, 'status' => 'pending', 'tournament_id' => $tournament->id],
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
            foreach ($rounds as $round) {
                $round->update(['status' => 'pending', 'tournament_id' => $tournament->id]);
            }
        }

        $rounds = $tournament->rounds;
        $this->createGamesForRound($rounds);

        return $tournament->load(['rounds', 'players']);
    }

    public function createGamesForRound(Collection $rounds)
    {
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
                    $twoPlayers = $players->random(2);
                    $whitePlayer = $twoPlayers->first();
                    $blackPlayer = $twoPlayers->last();

                    $players = $players->diff($twoPlayers);

                    $whitePlayer->update(['tournament_id' => $round->tournament->id]);
                    $blackPlayer->update(['tournament_id' => $round->tournament->id]);

                    $game = Game::create([
                        'start_time' => now(),
                        'status' => 'pending',
                        'white_player_id' => $whitePlayer->id,
                        'black_player_id'=> $blackPlayer->id,
                        'round_id' => $round->id
                    ]);
                    $game->calculateOddsForWhite();
                }
            }
            else
            {
                for ($i = 0; $i < $gamesCount; $i++)
                {
                    Game::create(['start_time' => now(), 'status' => 'started', 'round_id' => $round->id]);
                }
            }
        }
    }

    public function changeRound($roundId, Tournament $tournament)
    {
        $roundToStart = Round::where('id', $roundId + 1)->first();
        $playersLeft = Player::where('is_eliminated', false)->get();

        if ($roundToStart === null || $playersLeft->count() <= 1) {
            $tournament->update(['status' => 'finished']);
        } else {
            $gamesToUpdate = $roundToStart->games();
            foreach ($gamesToUpdate as $game) {

                $twoPlayers = $playersLeft->random(2);
                $whitePlayer = $twoPlayers->first();
                $blackPlayer = $twoPlayers->last();
                $playersLeft = $playersLeft->diff($twoPlayers);

                $game->update([
                    'status' => 'started',
                    'white_player_id' => $whitePlayer->id,
                    'black_player_id' => $blackPlayer->id,
                ]);
                $game->calculateOddsForWhite();
            }
        }
    }
}
