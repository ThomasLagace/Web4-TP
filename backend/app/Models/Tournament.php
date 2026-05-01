<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tournament extends Model
{
    protected $fillable = ['name', 'status', 'start_date', 'end_date', 'prize', 'winner_id'];

    public function rounds()
    {
        return $this->hasMany(Round::class);
    }

    public function players()
    {
        return $this->hasMany(Player::class);
    }

    public function winner()
    {
        return $this->belongsTo(Player::class, 'winner_id');
    }
}
