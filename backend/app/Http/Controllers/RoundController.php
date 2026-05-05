<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoundRequest;
use App\Http\Resources\RoundCollection;
use App\Http\Resources\RoundResource;
use App\Models\Round;
use App\Models\Tournament;
use Illuminate\Http\Request;

class RoundController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() : RoundCollection
    {
        $rounds = Round::with('tournament')->get();
        return new RoundCollection($rounds);
    }

    /**
     * Display the specified resource.
     */
    public function show(Round $round) : RoundResource
    {
        return new RoundResource($round);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RoundRequest $request) : RoundRequest
    {
        $round = Round::create($request->validated());
        return new RoundRequest($round);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(RoundRequest $request, Round $round) : RoundResource
    {
        $round->update($request->validated());
        return new RoundResource($round);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Round $round) : RoundResource
    {
        $round->delete();
        return new RoundResource($round);
    }
}
