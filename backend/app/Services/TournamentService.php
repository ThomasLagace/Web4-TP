<?php

namespace App\Services;

use App\Models\Game;
use App\Models\Tournament;

class TournamentService
{
    public function __construct(private RoundService $roundService, private NewsService $newsService) {}

    public function endTournament(Tournament $tournament, Game $game)
    {
        $tournament->update(['winner_id' => $game->winner_player_id, 'status' => 'finished']);
        $game->winnerPlayer->update(['points' => $game->winnerPlayer->points + $tournament->prize]);

        $this->newsService->endTournamentNews($tournament, $game);
    }

    public function createTournament(array $tournament) : Tournament
    {
        $tournament = Tournament::create($tournament);

        $rounds = $this->roundService->createRoundsForTournament($tournament);

        $this->roundService->createGamesForRounds($rounds);

        return $tournament->load(['rounds', 'players']);
    }
}
