<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('games', function (Blueprint $table) {
            $table->id();
            $table->dateTime('start_time');
            $table->enum('status', ['pending', 'started', 'finished'])
                ->default('started');
            $table->foreignId('round_id')
                ->constrained()
                ->onDelete('cascade');
            $table->foreignId('white_player_id')
                ->constrained('players')
                ->onDelete('cascade');
            $table->foreignId('black_player_id')
                ->constrained('players')
                ->onDelete('cascade');
            $table->foreignId('winner_player_id')
                ->constrained('players')
                ->nullable()
                ->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('games');
    }
};
