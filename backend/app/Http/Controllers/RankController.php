<?php

namespace App\Http\Controllers;

use App\Http\Requests\RankRequest;
use App\Http\Resources\RankCollection;
use App\Http\Resources\RankResource;
use App\Models\Rank;
use Illuminate\Http\Request;

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

        $ranks = Rank::paginate(15);
        return new RankCollection($ranks);
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
     * Show the form for editing the specified resource.
     */
    public function edit(Rank $rank)
    {
        //
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
    public function destroy(Rank $rank) : RankResource
    {
        $rank->delete();
        return new RankResource($rank);
    }
}
