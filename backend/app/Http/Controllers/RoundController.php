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
        $rounds = Round::with('tournament')->paginate(4);
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
    public function destroy(Round $round) : \Illuminate\Http\Response
    {
        $round->delete();
        return response()->noContent();
    }
}
