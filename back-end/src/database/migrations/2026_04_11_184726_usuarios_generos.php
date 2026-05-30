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
         Schema::create('usuarios_generos', function (Blueprint $table) {
            $table->primary(['id_usuario','id_genero']);
            $table->foreignId('id_usuario')->constrained('usuarios')->cascadeOnDelete();
            $table->foreignId('id_genero')->constrained('generos')->cascadeOnDelete();
            $table->integer('reproducciones')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('usuarios_generos');
    }
};
