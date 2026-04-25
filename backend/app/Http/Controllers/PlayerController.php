<?php

namespace App\Http\Controllers;

use App\Http\Requests\PlayerRequest;
use App\Http\Resources\PlayerCollection;
use App\Http\Resources\PlayerResource;
use App\Models\Player;
use Illuminate\Http\Request;

class PlayerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() : PlayerCollection
    {
        $query = Player::query();

        if (request() -> has('is_eliminated')) {
            $query ->where('is_eliminated',true)->get();
        }

        $query = Player::with('rank')->paginate(15);
        return new PlayerCollection($query);
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
    public function store(PlayerRequest $request) : PlayerResource
    {
        $player = Player::create($request->validated());
        $player->calculateRank();
        return new PlayerResource($player);
    }

    /**
     * Display the specified resource.
     */
    public function show(Player $player) : PlayerResource
    {
        return new PlayerResource($player);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Player $player)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PlayerRequest $request, Player $player) : PlayerResource
    {
        $player->update($request->validated());
        $player->calculateRank();
        return new PlayerResource($player);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Player $player) : PlayerResource
    {
        $player->delete();
        return new PlayerResource($player);
    }
}
