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
         Schema::create('listas_canciones', function (Blueprint $table) {
            $table->primary(['lista_id','cancion_id']);
            $table->foreignId('lista_id')->constrained('listas')->cascadeOnDelete();
            $table->foreignId('cancion_id')->constrained('canciones')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('listas_canciones');
    }
};
