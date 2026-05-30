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
         Schema::create('usuarios_canciones', function (Blueprint $table) {
            $table->primary(['id_usuario','id_cancion']);
            $table->foreignId('id_usuario')->constrained('usuarios')->cascadeOnDelete();
            $table->foreignId('id_cancion')->constrained('canciones')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
         Schema::dropIfExists('usuarios_canciones');
    }
};
