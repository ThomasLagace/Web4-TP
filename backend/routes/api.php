<?php

use App\Http\Controllers\GameController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\PlayerController;
use App\Http\Controllers\RankController;
use App\Http\Controllers\RoundController;
use App\Http\Controllers\RoundGameController;
use App\Http\Controllers\TournamentController;
use App\Http\Controllers\TournamentRoundController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware('throttle:100,1')->group(function () {

    // Route imbriquée pour visualiser les rounds d'un tournoi spécifique
    Route::get('/tournaments/{tournament}/rounds', [TournamentRoundController::class, 'showRoundsById']);

    // Route imbriquée pour visualiser les parties d'un round spécifique
    Route::get('/rounds/{round}/games', [RoundGameController::class, 'showGamesById']);

    // Endpoint des nouvelles d'actualités
    Route::prefix('/news')
        ->controller(NewsController::class)
        ->group(function () {
            Route::get('/', 'index');
            Route::get('/{news}', 'show');
            Route::post('/', 'store');
            Route::put('/{news}', 'update');
            Route::delete('/{news}', 'destroy');
        });

    // Endpoint des rangs que les joueurs peuvent atteindrent avec leurs elos
    Route::prefix('/ranks')
        ->controller(RankController::class)
        ->group(function () {
            Route::get('/', 'index');
            Route::get('/{rank}', 'show');
            Route::post('/', 'store');
            Route::put('/{rank}', 'update');
            Route::delete('/{rank}', 'destroy');
        });

    // Endpoint des joueurs de l'appli
    Route::prefix('/players')
        ->controller(PlayerController::class)
        ->group(function () {
            Route::get('/', 'index');
            Route::get('/{player}', 'show');
            Route::post('/', 'store');
            Route::put('/{player}', 'update');
            Route::delete('/{player}', 'destroy');
        });

    // Endpoint des parties d'un round de tournoi
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

    // Endpoint des tournois
    Route::prefix('/tournaments')
        ->controller(TournamentController::class)
        ->group(function () {
            Route::get('/', 'index');
            Route::get('/{tournament}', 'show');
            Route::post('/', 'store');
            Route::put('/{tournament}', 'update');
            Route::delete('/{tournament}', 'destroy');
        });

    // Endpoint des rounds associés à un tournoi
    Route::prefix('/rounds')
        ->controller(RoundController::class)
        ->group(function () {
            Route::get('/', 'index');
            Route::get('/{round}', 'show');
            Route::post('/', 'store');
            Route::put('/{round}', 'update');
            Route::delete('/{round}', 'destroy');
        });
});
