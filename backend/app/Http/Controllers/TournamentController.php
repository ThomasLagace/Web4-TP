<?php

namespace App\Http\Controllers;

use App\Http\Requests\TournamentRequest;
use App\Http\Resources\TournamentCollection;
use App\Http\Resources\TournamentResource;
use App\Models\News;
use App\Models\Tournament;
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
    public function store(TournamentRequest $request, TournamentService $service) : TournamentResource
    {
        $tournament = $service->createTournament($request->validated());
        News::create([
            'date' => now(),
            'title' => 'Un nouveau tournoi a commencé',
            'content' =>
                'Le ' .
                $tournament->name .
                ' ouvre ses portes à l\'instant! Venez encourager vos joueurs préférés à distance sur notre site web directement. Bon visionnage!'
            ]);
        return new TournamentResource($tournament);
    }

    /**
     * Display the specified resource.
     */
    public function show(Tournament $t) : TournamentResource
    {
        return new TournamentResource($t);
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
    public function destroy(Tournament $t) : \Illuminate\Http\Response
    {
        $t->delete();
        return response()->noContent();
    }

    public function close(Tournament $t) : TournamentResource
    {
        $t->update(['status' => 'finished']);
        return new TournamentResource($t);
    }
}
