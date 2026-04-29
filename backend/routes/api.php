<?php

use App\Http\Controllers\GameController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\PlayerController;
use App\Http\Controllers\RankController;
use App\Http\Controllers\RoundGameController;
use App\Http\Controllers\TournamentController;
use App\Http\Controllers\TournamentRoundController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// route imbriquée pour visualiser les rounds d'un tournoi spécifique
Route::get('/tournaments/{tournament}/rounds', [TournamentRoundController::class, 'showRoundsById']);

// route imbriquée pour visualiser les parties d'un round spécifique
Route::get('/rounds/{round}/games', [RoundGameController::class, 'showGamesById']);

// route '/' pour voir toutes les news des parties + filtrage (TODO)
Route::prefix('/news')
    ->controller(NewsController::class)
    ->group(function () {
        Route::get('/', 'index');
    });

// route '/' pour observer les ranks
Route::prefix('/ranks')
    ->controller(RankController::class)
    ->middleware('throttle:100,1')
    ->group(function () {
        Route::get('/', 'index');
    });

// route '/show' pour observer les stats d'un joueur spécifique
// route '/' pour voir tous les joueurs + filtrage sur nombre d'elo ou nom (TODO)
Route::prefix('/players')
    ->controller(PlayerController::class)
    ->group(function () {
        Route::get('/', 'index');
        Route::get('/{player}', 'show');
    });

// route '/{games}/finish' pour stopper une partie
Route::prefix('/games')
    ->controller(GameController::class)
    ->group(function () {
        Route::post('/{game}/finish', 'finish');
    });

// route '/store' pour créer un tournoi, les rounds et les parties se créent dans le TournamentService
Route::prefix('/tournaments')
    ->controller(TournamentController::class)
    ->group(function () {
        Route::post('/', 'store');
    });
