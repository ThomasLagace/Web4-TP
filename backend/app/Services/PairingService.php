<?php

namespace App\Services;

use App\Models\Game;
use App\Models\Player;
use App\Models\Round;
use App\Models\Tournament;
use Illuminate\Database\Eloquent\Collection;

class PairingService
{
    /**
     * Take two random players from a collection and attach them to a given game
     * @param Collection $players
     * @param Round $round
     * @param Game $game
     * @return Collection
     */
    public function pairPlayers (Collection $players, Round $round, Game $game): Collection
    {
        $twoPlayers = $players->random(2);

        foreach ($twoPlayers as $player) {
            $player->tournaments()->syncWithoutDetaching([
                $round->tournament->id => ['is_eliminated' => false]
            ]);
        }

        $game->update([
            'white_player_id' => $twoPlayers->first()->id,
            'black_player_id'=> $twoPlayers->last()->id,
        ]);

        $game->calculateOddsForWhite();

        return $twoPlayers;
    }

    /**
     * Return all the players that are not eliminated yet for a given tournament
     * @param Tournament $tournament
     * @return Collection
     */
    public function getPlayersLeft(Tournament $tournament): Collection
    {
        return $tournament->players()
            ->wherePivot('is_eliminated', false)
            ->get();
    }
}
