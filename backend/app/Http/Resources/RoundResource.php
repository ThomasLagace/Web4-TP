<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RoundResource extends JsonResource
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
            'name' => $this->name,
            'status' => $this->status,
            'points_multiplier' => $this->points_multiplier,
            'tournament_id' => $this->tournament_id,
            'meta' => [
                'is_deletable' => $this->status === 'finished',
            ],
        ];
    }
}
