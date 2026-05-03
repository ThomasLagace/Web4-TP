<?php

namespace App\Observers;

use App\Models\Game;
use App\Models\Round;
use App\Services\NewsService;
use App\Services\RoundService;
use App\Services\TournamentService;

class GameObserver
{
    public function __construct(private RoundService $roundService, private TournamentService $tournamentService, private NewsService $newsService) {}

    /**
     * Handle the Game "updated" event.
     */
    public function updated(Game $game): void
    {
        if ($game->wasChanged('status') && $game->status === 'finished') {
            $round = Round::where('id', $game->round_id)->first();
            $tournament = $round->tournament;

            $finishedGames = $round->games()
                ->where('status', 'finished')
                ->count();

            $totalGames = $round->games()->count();

            if ($finishedGames === $totalGames) {
                $round->update(['status' => 'finished']);
                $response = $this->roundService->changeRound($game, $round);

                if ($response === "tournament ended")
                {
                    $this->tournamentService->endTournament($tournament, $game);
                }
            } else {
                $this->newsService->endGameNews($game);
            }
        }
    }
}
