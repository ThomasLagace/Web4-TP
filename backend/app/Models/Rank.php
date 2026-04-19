<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rank extends Model
{
    protected $fillable = ['min_points', 'max_points', 'name'];

    public function players() {
        return $this->hasMany(Player::class);
    }
}
