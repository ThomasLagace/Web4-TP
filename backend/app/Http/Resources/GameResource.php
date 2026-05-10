<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GameResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'start_time' => $this->start_time,
            'status' => $this->status,
            'white_player_odds' => $this->white_player_odds,
            'round_id' => $this->round_id,
            'white_player_id' => $this->white_player_id,
            'black_player_id' => $this->black_player_id,
            'winner_player_id' => $this->winner_player_id,
            'meta' => [
                'is_deletable' => $this->status === 'finished',
            ],
        ];
    }
}
