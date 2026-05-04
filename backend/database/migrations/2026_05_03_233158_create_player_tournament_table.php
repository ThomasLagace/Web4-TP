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
        Schema::create('player_tournament', function (Blueprint $table) {
            $table->id();
            $table->foreignId('player_id')->constrained()->ondelete('cascade');
            $table->foreignId('tournament_id')->constrained()->ondelete('cascade');
            $table->boolean('is_eliminated')->default(false);
            $table->timestamps();
        });

        Schema::table('players', function (Blueprint $table) {
            $table->dropForeign(['tournament_id']);
            $table->dropColumn(['tournament_id', 'is_eliminated']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('player_tournament');

        Schema::table('players', function (Blueprint $table) {
            $table->boolean('is_eliminated')->default(false);
            $table->foreignId('tournament_id')->nullable()->constrained()->ondelete('cascade');
        });
    }
};
