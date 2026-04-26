<?php

namespace App\Http\Controllers;

use App\Http\Requests\GameRequest;
use App\Http\Resources\GameCollection;
use App\Http\Resources\GameResource;
use App\Models\Game;
use App\Models\Player;
use Illuminate\Http\Request;

class GameController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() : GameCollection
    {
        $games = Game::with(['round', 'whitePlayer', 'blackPlayer', 'winnerPlayer',])-> get();
        return new GameCollection($games);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(GameRequest $request) : GameResource
    {
        $game = Game::create($request->validated());
        $game->calculateOddsForWhite();
        return new GameResource($game);
    }

    /**
     * Display the specified resource.
     */
    public function show(Game $game) : GameResource
    {
        return new GameResource($game);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Game $game)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(GameRequest $request, Game $game) : GameResource
    {
        $game->update($request->validated());
        $game->calculateOddsForWhite();
        return new GameResource($game);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Game $game) : GameResource
    {
        $game->delete();
        return new GameResource($game);
    }

    public function finish(Game $game) : GameResource
    {
        $game->designateWinner();
        $game->refresh();
        $game->distributePointsToPlayers();
        return new GameResource($game);
    }
}
