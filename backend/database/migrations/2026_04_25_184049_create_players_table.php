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
        Schema::create('players', function (Blueprint $table) {
            $table->id();
            $table->string('username');
            $table->string('affiliation');
            $table->integer('points')
                ->default(0);
            $table->boolean('is_eliminated')
                ->default(false);
            $table->foreignId('rank_id')
                ->nullable()
                ->constrained()
                ->onDelete('cascade');
            $table->foreignId('tournament_id')
                ->nullable()
                ->constrained()
                ->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('players');
    }
};
