<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    protected $fillable = [
        'start_time',
        'status',
        'white_player_odds',
        'round_id',
        'white_player_id',
        'black_player_id',
        'winner_player_id'
    ];

    public function round()
    {
        return $this->belongsTo(Round::class);
    }

    public function whitePlayer()
    {
        return $this->belongsTo(Player::class, 'white_player_id');
    }

    public function blackPlayer()
    {
        return $this->belongsTo(Player::class, 'black_player_id');
    }

    public function winnerPlayer()
    {
        return $this->belongsTo(Player::class, 'winner_player_id');
    }

    public function calculateOddsForWhite()
    {
        if ($this->whitePlayer !== null && $this->blackPlayer !== null) {
            $odds = 1/( 1 + 10 ** ( ($this->blackPlayer->points - $this->whitePlayer->points)/400 ) );
            $this->white_player_odds = round($odds * 100);
            $this->status = 'started';
            $this->save();
        }
    }

    public function designateWinner()
    {
        $winner = collect([$this->whitePlayer, $this->blackPlayer])->random();
        $this->winner_player_id = $winner->id;
        $this->save();
    }

    public function distributePointsToPlayers()
    {
        $this->loadMissing(['round', 'whitePlayer', 'blackPlayer', 'winnerPlayer']);

        if ($this->whitePlayer->id == $this->winnerPlayer->id) {
            $this->whitePlayer->calculatePoints($this->round->points_multiplier, $this->white_player_odds);
            $this->blackPlayer->update(['is_eliminated' => 1]);
        } elseif ($this->blackPlayer->id == $this->winnerPlayer->id) {
            $this->blackPlayer->calculatePoints($this->round->points_multiplier, (100 -$this->white_player_odds));
            $this->whitePlayer->update(['is_eliminated' => 1]);
        }
    }
}
