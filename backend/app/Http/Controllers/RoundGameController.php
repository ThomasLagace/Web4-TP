<?php

namespace App\Http\Controllers;
use App\Http\Resources\GameCollection;
use App\Models\Game;
use App\Models\Round;

class RoundGameController extends Controller
{
    public function showGamesById(Round $round) : GameCollection
    {
        $games = Game::where('round_id', $round->id)->get();
        return new GameCollection($games);
    }
}
