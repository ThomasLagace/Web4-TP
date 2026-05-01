<?php

namespace App\Observers;

use App\Models\Game;
use App\Models\News;
use App\Models\Round;
use App\Models\Tournament;
use App\Services\TournamentService;

class GameObserver
{
    public function __construct(private TournamentService $service) {}

    /**
     * Handle the Game "updated" event.
     */
    public function updated(Game $game): void
    {
        if ($game->wasChanged('status') && $game->status === 'finished') {
            $round = Round::where('id', $game->round_id)->first();

            $finishedGames = $round->games()
                ->where('status', 'finished')
                ->count();

            $totalGames = $round->games()->count();

            if ($finishedGames === $totalGames) {
                $round->update(['status' => 'finished']);
                $tournament = Tournament::where('id', $round->tournament_id)->first();
                $this->service->changeRound($game, $round->id, $tournament);
            } else {
                News::create([
                    'date' => now(),
                    'title' => 'Partie terminée',
                    'content' => 'La partie entre ' .
                        $game->whitePlayer->username . " et " .
                        $game->blackPlayer->username . ' est terminée. Le vainqueur est ' .
                        $game->winnerPlayer->username
                ]);
            }
        }
    }
}
