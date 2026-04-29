<?php

namespace App\Http\Controllers;

use App\Http\Requests\RankRequest;
use App\Http\Resources\RankCollection;
use App\Http\Resources\RankResource;
use App\Models\Rank;

class RankController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() : RankCollection
    {
        $query = Rank::query();

        if (request() -> has('name')) {
            $query ->where('name','LIKE','%'.request() -> get('name').'%');
        }

        $ranks = $query->paginate(15);
        return new RankCollection($ranks);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RankRequest $request) : RankResource
    {
        $rank = Rank::create($request->validated());
        return new RankResource($rank);
    }

    /**
     * Display the specified resource.
     */
    public function show(Rank $rank) : RankResource
    {
        return new RankResource($rank);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(RankRequest $request, Rank $rank) : RankResource
    {
        $rank->update($request->validated());
        return new RankResource($rank);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Rank $rank) : \Illuminate\Http\Response
    {
        $rank->delete();
        return response()->noContent();
    }
}
