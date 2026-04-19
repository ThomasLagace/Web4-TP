<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    protected $fillable = [
        'start_time',
        'status',
        'round_id',
        'white_player_id',
        'black_player_id',
        'winner_player_id'
    ];

    public function round() {
        return $this->belongsTo(Round::class);
    }

    public function whitePlayer() {
        return $this->belongsTo(Player::class, 'white_player_id');
    }

    public function blackPlayer() {
        return $this->belongsTo(Player::class, 'black_player_id');
    }

    public function winnerPlayer() {
        return $this->belongsTo(Player::class, 'winner_player_id');
    }
}
