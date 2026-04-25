<?php

namespace Database\Factories;

use App\Models\Player;
use App\Models\Rank;
use Illuminate\Database\Eloquent\Factories\Factory;
use function Laravel\Prompts\table;

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
            'is_eliminated' => false,
            'rank_id' => $this->calculateRank($points),
            'tournament_id' => Rank::first(),
        ];
    }

    public function calculateRank($points) {
        return Rank::where('min_points', '<=', $points)->where('max_points', '>=', $points)->first()->id;
    }
}
