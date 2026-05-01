<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    use HasFactory;
    protected $fillable = ['username', 'affiliation', 'points', 'is_eliminated', 'tournament_id', 'rank_id'];

    public function rank()
    {
        return $this->belongsTo(Rank::class);
    }

    public function tournament()
    {
        return $this->belongsTo(Tournament::class);
    }

    public function gamesAsWhite()
    {
        return $this->hasMany(Game::class, 'white_player_id');
    }

    public function gamesAsBlack()
    {
        return $this->hasMany(Game::class, 'black_player_id');
    }

    public function gamesWon()
    {
        return $this->hasMany(Game::class, 'winner_player_id');
    }

    public function calculateRank()
    {
        $rank = Rank::where('min_points', '<=', $this->points)->where('max_points', '>=', $this->points)->first();
        if ($this) {
            $this->rank_id = $rank->id;
            $this->save();
        }
    }

    public function calculatePoints($multiplier, $odds)
    {
        $this->update(['points' => $this->points + $multiplier * (100 - $odds) + 400]);
        $this->calculateRank();
    }
}
