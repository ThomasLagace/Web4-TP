<?php

namespace Database\Seeders;

use App\Models\News;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NewsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $news = [
            'date' => now(),
            'title' => 'La saison est ouverte!',
            'content' => 'Chers joueurs, la saison compétitive 2026 est officiellement lancée ! Affrontez des adversaires, accumulez des points et grimpez dans le classement. !',
            ];

        News::create($news);
    }
}
