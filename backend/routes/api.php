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

Route::get('/tournaments/{tournament}/rounds', [TournamentRoundController::class, 'showRoundsById']);
Route::get('/rounds/{round}/games', [RoundGameController::class, 'showGamesById']);

Route::prefix('/news')
    ->controller(NewsController::class)
    ->group(function () {
        Route::get('/', 'index');
    });

Route::prefix('/ranks')
    ->controller(RankController::class)
    ->middleware('throttle:100,1')
    ->group(function () {
        Route::get('/', 'index');
        Route::get('/{rank}', 'show');
        Route::post('/', 'store');
        Route::put('/{rank}', 'update');
        Route::delete('/{rank}', 'destroy');
    });

Route::prefix('/players')
    ->controller(PlayerController::class)
    ->group(function () {
        Route::get('/', 'index');
        Route::get('/{player}', 'show');
        Route::post('/', 'store');
        Route::put('/{player}', 'update');
        Route::delete('/{player}', 'destroy');
    });

Route::prefix('/games')
    ->controller(GameController::class)
    ->group(function () {
        Route::get('/', 'index');
        Route::get('/{game}', 'show');
        Route::post('/', 'store');
        Route::put('/{game}', 'update');
        Route::delete('/{game}', 'destroy');
        Route::post('/{game}/finish', 'finish');
    });
