<?php

namespace App\Http\Controllers;

use App\Http\Requests\TournamentRequest;
use App\Http\Resources\TournamentCollection;
use App\Http\Resources\TournamentResource;
use App\Models\Tournament;
use Illuminate\Http\Request;

class TournamentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() : TournamentCollection
    {
        $t = Tournament::paginate(15);
        return new TournamentCollection($t);
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
    public function store(TournamentRequest $request) : TournamentResource
    {
        $t = Tournament::create($request->validated());
        return new TournamentResource($t);
    }

    /**
     * Display the specified resource.
     */
    public function show(Tournament $t) : TournamentResource
    {
        return new TournamentResource($t);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tournament $tournament)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TournamentRequest $request, Tournament $t) : TournamentResource
    {
        $t -> update($request->validated());
        return new TournamentResource($t);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tournament $t)
    {
        $t->delete();
        return new TournamentResource($t);
    }
}
