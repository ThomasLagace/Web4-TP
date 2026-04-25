<?php

namespace Database\Seeders;

use App\Models\Round;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoundSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $rounds = [
            ['name' => 'Round 1', 'points_multiplier' => 1, 'status' => 'pending', 'tournament_id' => 1],
            ['name' => 'Round 2', 'points_multiplier' => 2, 'status' => 'pending', 'tournament_id' => 1],
            ['name' => 'Demi-finale', 'points_multiplier' => 3, 'status' => 'pending', 'tournament_id' => 1],
            ['name' => 'Finale', 'points_multiplier' => 5, 'status' => 'pending', 'tournament_id' => 1],
        ];

        foreach ($rounds as $round) {
            Round::create($round);
        }
    }
}
