<?php

namespace App\Services;

use App\Models\Game;

class GameService
{
    public function finishGame(Game $game): Game
    {
        if ($game->status !== 'finished') {
            $game->load(['whitePlayer.rank', 'blackPlayer.rank', 'round']);
            $game->designateWinner();
            $game->load(['winnerPlayer']);
            $game->distributePointsToPlayers();
            $game->update(['status' => 'finished']);

            return $game->fresh(['whitePlayer', 'blackPlayer', 'winnerPlayer', 'round']);
        }

        return $game;
    }
}
