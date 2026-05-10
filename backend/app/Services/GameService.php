<?php

namespace App\Services;

use App\Models\Game;

class GameService
{
    /**
     * Handle the end of a game
     * @param Game $game
     * @return Game
     */
    public function finishGame(Game $game): Game
    {
        if ($game->status !== 'finished') {
            $game->load(['whitePlayer', 'blackPlayer', 'round.tournament']);
            $game->designateWinner();
            $game->load(['winnerPlayer']);
            $game->distributePointsToPlayers($game->round->tournament);
            $game->update(['status' => 'finished']);

            return $game->fresh(['whitePlayer', 'blackPlayer', 'winnerPlayer', 'round']);
        }

        return $game;
    }
}
