<?php

namespace App\Http\Controllers;

use App\Http\Requests\PlayerRequest;
use App\Http\Resources\PlayerCollection;
use App\Http\Resources\PlayerResource;
use App\Models\Player;

class PlayerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() : PlayerCollection
    {
        $players = Player::with('rank')->paginate(15);
        return new PlayerCollection($players);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PlayerRequest $request) : PlayerResource
    {
        $player = Player::create($request->validated());
        $player->calculateRank();
        $player->load('rank');
        return new PlayerResource($player);
    }

    /**
     * Display the specified resource.
     */
    public function show(Player $player) : PlayerResource
    {
        $player->load('rank');
        return new PlayerResource($player);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PlayerRequest $request, Player $player) : PlayerResource
    {
        $player->update($request->validated());
        $player->calculateRank();
        $player->load('rank');
        return new PlayerResource($player);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Player $player) : \Illuminate\HTTP\Response
    {
        $player->delete();
        return response()->noContent();
    }
}
