<?php

namespace Database\Seeders;

use App\Models\Tournament;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TournamentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Tournament::create([
            'name' => 'Tournois des champions',
            'start_date' => now(),
            'end_date' => now()->addDay(4),
            'prize' => 1000,
        ]);
    }
}
