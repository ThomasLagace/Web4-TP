<?php

namespace App\Services;

use App\Models\Game;
use App\Models\Player;
use App\Models\Round;
use Illuminate\Database\Eloquent\Collection;

class PairingService
{
    public function pairPlayers (Collection $players, Round $round, Game $game)
    {
        $twoPlayers = $players->random(2);

        foreach ($twoPlayers as $player) $player->update(['tournament_id' => $round->tournament->id]);

        $game->update([
            'white_player_id' => $twoPlayers->first()->id,
            'black_player_id'=> $twoPlayers->last()->id,
        ]);

        $game->calculateOddsForWhite();

        return $twoPlayers;
    }

    public function getPlayersLeft()
    {
        return Player::where('is_eliminated', 0)->get();
    }
}
