<?php

namespace Database\Seeders;

use App\Models\Rank;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RankSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $ranks = [
            ['min_points' => 0,    'max_points' => 199,  'name' => 'Débutant'],
            ['min_points' => 200,  'max_points' => 399,  'name' => 'Novice'],
            ['min_points' => 400,  'max_points' => 599,  'name' => 'Apprenti'],
            ['min_points' => 600,  'max_points' => 799,  'name' => 'Amateur'],
            ['min_points' => 800,  'max_points' => 999,  'name' => 'Intermédiaire'],
            ['min_points' => 1000, 'max_points' => 1199, 'name' => 'Avancé'],
            ['min_points' => 1200, 'max_points' => 1399, 'name' => 'Compétiteur'],
            ['min_points' => 1400, 'max_points' => 1599, 'name' => 'Expert'],
            ['min_points' => 1600, 'max_points' => 1799, 'name' => 'Maître'],
            ['min_points' => 1800, 'max_points' => 1999, 'name' => 'Maître International'],
            ['min_points' => 2000, 'max_points' => 2199, 'name' => 'Grand Maître'],
            ['min_points' => 2200, 'max_points' => 2399, 'name' => 'Grand Maître FIDE'],
            ['min_points' => 2400, 'max_points' => 2599, 'name' => 'Super Grand Maître'],
            ['min_points' => 2600, 'max_points' => 9999, 'name' => 'Élite Mondiale'],
        ];

        foreach ($ranks as $rank) {
            Rank::create($rank);
        }
    }
}
