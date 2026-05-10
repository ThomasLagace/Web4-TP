<?php

namespace App\Services;

use App\Models\Game;
use App\Models\News;
use App\Models\Round;
use App\Models\Tournament;

class NewsService
{
    /**
     * Create News for the beginning of a tournament
     * @param Tournament $tournament
     * @return void
     */
    public function startTournamentNews(Tournament $tournament): void
    {
        News::create([
            'date' => now(),
            'title' => 'Un nouveau tournoi a commencé',
            'content' =>
                'Le ' .
                $tournament->name .
                ' ouvre ses portes à l\'instant! Venez encourager vos joueurs préférés à distance directement sur notre site web. Bon visionnage!'
        ]);
    }

    /**
     * Create News for the end of a tournament
     * @param Tournament $tournament
     * @param Game $game
     * @return void
     */
    public function endTournamentNews(Tournament $tournament, Game $game): void
    {
        News::create([
            'date' => now(),
            'title' => $tournament->name . ' terminé',
            'content' =>
                'Dans l\'affrontement final entre ' . $game->whitePlayer->username .
                ' et ' . $game->blackPlayer->username .
                ', nous sommes fier de vous annoncer que le grand gagnant du ' .
                $tournament->name .
                ' n\'est nul autre que ' .
                $game->winnerPlayer->username .
                '! Ce tournoi est désormais clos, le gagnant a reçu la somme de ' .
                $tournament->prize .
                ' elo. Nous espérons vous revoir au prochain tournoi !'
        ]);
    }

    /**
     * Create News for the end of a round
     * @param Game $game
     * @param Round $roundToStart
     * @return void
     */
    public function endRoundNews(Game $game, Round $roundToStart): void
    {
        News::create([
            'date' => now(),
            'title' => 'Changement de round - ' . $roundToStart->tournament->name,
            'content' =>
                'Le round actuel se termine après l\'affrontement mythique entre ' .
                $game->whitePlayer->username .
                ' et ' . $game->blackPlayer->username .
                ', dans lequel ' . $game->winnerPlayer->username .
                ' a triomphé. Préparez-vous, le round suivant commence: ' .
                $roundToStart->name
        ]);
    }

    /**
     * Create News for the end of a game
     * @param Game $game
     * @return void
     */
    public function endGameNews(Game $game)
    {
        News::create([
            'date' => now(),
            'title' => 'Partie terminée - ' . $game->round->tournament->name,
            'content' => 'La partie entre ' .
                $game->whitePlayer->username . " et " .
                $game->blackPlayer->username . ' est terminée. Le vainqueur est ' .
                $game->winnerPlayer->username
        ]);
    }
}
