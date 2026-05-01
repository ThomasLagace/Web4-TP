<?php

namespace App\Http\Controllers;

use App\Http\Requests\GameRequest;
use App\Http\Resources\GameCollection;
use App\Http\Resources\GameResource;
use App\Models\Game;

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
     * Store a newly created resource in storage.
     */
    public function store(GameRequest $request) : GameResource
    {
        $game = Game::create($request->validated());
        $game->calculateOddsForWhite();
        $game->load(['whitePlayer', 'blackPlayer', 'winnerPlayer', 'round']);
        return new GameResource($game);
    }

    /**
     * Display the specified resource.
     */
    public function show(Game $game) : GameResource
    {
        $game->load(['whitePlayer', 'blackPlayer', 'winnerPlayer', 'round']);
        return new GameResource($game);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(GameRequest $request, Game $game) : GameResource
    {
        if ($game->status !== 'finished') {
            $game->update($request->validated());
            $game->calculateOddsForWhite();
            $game->load(['whitePlayer', 'blackPlayer', 'winnerPlayer', 'round']);
        }

        return new GameResource($game);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Game $game) : \Illuminate\Http\Response
    {
        $game->delete();
        return response()->noContent();
    }

    /**
     * Finishes the game and display it's updated properties.
     */
    public function finish(Game $game) : GameResource
    {
        if ($game->status !== 'finished') {
            $game->load(['whitePlayer.rank', 'blackPlayer.rank', 'round']);
            $game->designateWinner();
            $game->load(['winnerPlayer']);
            $game->distributePointsToPlayers();
            $game->update(['status' => 'finished']);
        }

        return new GameResource($game);
    }
}
