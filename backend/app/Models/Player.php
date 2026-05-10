<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    use HasFactory;
    protected $fillable = ['username', 'affiliation', 'points'];
    protected $appends = ['rank'];

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

    public function tournaments() {
        return $this->belongsToMany(Tournament::class)
            ->withPivot('is_eliminated')
            ->withTimestamps();
    }

    /**
     * Calculates the rank of the player by its amount of points
     * @return void
     */
    public function getRankAttribute()
    {
        return Rank::where('min_points', '<=', $this->points)
            ->where(function ($query) {
                $query->whereNull('max_points')
                    ->orWhere('max_points', '>=', $this->points);
            })->first();
    }

    public function hasActiveTournaments()
    {
        return Tournament::where('status', '!=', 'finished')->exists();
    }

    /**
     * Calculate the points obtained by the winner player
     * @param $multiplier
     * @param $odds
     * @return void
     */
    public function calculatePoints($multiplier, $odds)
    {
        $this->update(['points' => $this->points + $multiplier * (100 - $odds) + 400]);
    }
}
