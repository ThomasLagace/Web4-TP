<?php

namespace App\Services;

use App\Models\Game;
use App\Models\Tournament;

class TournamentService
{
    public function __construct(private RoundService $roundService, private NewsService $newsService) {}

    /**
     * Handle the ending of a tournament
     * @param Tournament $tournament
     * @param Game $game
     * @return void
     */
    public function endTournament(Tournament $tournament, Game $game)
    {
        $tournament->update(['winner_id' => $game->winner_player_id, 'status' => 'finished']);
        $game->winnerPlayer->update(['points' => $game->winnerPlayer->points + $tournament->prize]);

        $this->newsService->endTournamentNews($tournament, $game);
    }

    /**
     * Handle the creation of a tournament
     * @param array $tournament
     * @return Tournament
     */
    public function createTournament(array $tournament, array $player_ids) : Tournament
    {
        $tournament = Tournament::create($tournament);
        $tournament->players()->attach($player_ids);

        $rounds = $this->roundService->createRoundsForTournament($tournament);

        $this->roundService->createGamesForRounds($rounds, $tournament);

        return $tournament->load(['rounds', 'players']);
    }
}
