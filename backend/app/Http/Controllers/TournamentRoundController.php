<?php

namespace App\Http\Controllers;

use App\Http\Resources\RoundCollection;
use App\Models\Round;
use App\Models\Tournament;

class TournamentRoundController extends Controller
{
    /**
     * Display the rounds for the tournament.
     */
    public function showRoundsById(Tournament $tournament) : RoundCollection
    {
        $rounds = Round::where('tournament_id', $tournament->id)->get();
        return new RoundCollection($rounds);
    }
}
