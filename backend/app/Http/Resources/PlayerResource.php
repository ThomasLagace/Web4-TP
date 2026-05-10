<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PlayerResource extends JsonResource
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
            'username' => $this->username,
            'affiliation' => $this->affiliation,
            'points' => $this->points,
            'rank' => $this->rank,
            'is_deletable' => !$this->hasActiveTournaments(),
        ];
    }
}
