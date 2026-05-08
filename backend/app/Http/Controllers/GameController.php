<?php

namespace App\Http\Controllers;

use App\Http\Requests\GameRequest;
use App\Http\Resources\GameCollection;
use App\Http\Resources\GameResource;
use App\Models\Game;
use App\Services\GameService;

class GameController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() : GameCollection
    {
        $games = Game::with(['round', 'whitePlayer', 'blackPlayer', 'winnerPlayer',])->paginate(15);
        return new GameCollection($games);
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
        if ($game->status === 'pending') {
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
    public function finish(Game $game, GameService $gameService) : GameResource
    {
        return new GameResource($gameService->finishGame($game));
    }
}
