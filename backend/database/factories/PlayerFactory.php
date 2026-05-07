<?php

namespace Database\Factories;

use App\Models\Player;
use App\Models\Rank;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Player>
 */
class PlayerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $points = random_int(0, 2000);

        return [
            'username' => $this->faker->userName(),
            'affiliation' => $this->faker->company(),
            'points' => $points,
            'rank_id' => $this->calculateRank($points),
        ];
    }

    public function calculateRank($points) {
        return Rank::where('min_points', '<=', $points)
            ->where(function ($query) use ($points) {
                $query->whereNull('max_points')
                    ->orWhere('max_points', '>=', $points);
            })
            ->first()->id;
    }
}
