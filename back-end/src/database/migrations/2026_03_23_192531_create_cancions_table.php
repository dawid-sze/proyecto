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
        Schema::create('canciones', function (Blueprint $table) {
            $table->id();
            $table->string('nombre_cancion',50)->unique();
            $table->string('cancion',10000);
            $table->bigInteger('reproducciones')->default(0);
            $table->foreignId('id_disco')->constrained('discos')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('canciones');
    }
};
