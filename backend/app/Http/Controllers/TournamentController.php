<?php

namespace App\Http\Controllers;

use App\Http\Requests\TournamentRequest;
use App\Http\Resources\TournamentCollection;
use App\Http\Resources\TournamentResource;
use App\Models\Tournament;
use App\Services\NewsService;
use App\Services\TournamentService;

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
     * Store a newly created resource in storage.
     */
    public function store(TournamentRequest $request, TournamentService $tournamentService, NewsService $newsService) : TournamentResource
    {
        $tournament = $tournamentService->createTournament($request->validated());
        $newsService->startTournamentNews($tournament);
        return new TournamentResource($tournament);
    }

    /**
     * Display the specified resource.
     */
    public function show(Tournament $tournament) : TournamentResource
    {
        $tournament->load(['winner']);
        return new TournamentResource($tournament);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TournamentRequest $request, Tournament $tournament) : TournamentResource
    {
        $tournament -> update($request->validated());
        return new TournamentResource($tournament);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tournament $tournament) : \Illuminate\Http\Response
    {
        $tournament->delete();
        return response()->noContent();
    }
}
