<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    protected $fillable = ['username', 'affiliation', 'points', 'rank_id'];

    public function rank()
    {
        return $this->belongsTo(Rank::class);
    }

    public function gamesAsWhite() {
        return $this->hasMany(Game::class, 'white_player_id');
    }

    public function gamesAsBlack() {
        return $this->hasMany(Game::class, 'black_player_id');
    }

    public function gamesWon() {
        return $this->hasMany(Game::class, 'winner_player_id');
    }

    use hasFactory;
}
