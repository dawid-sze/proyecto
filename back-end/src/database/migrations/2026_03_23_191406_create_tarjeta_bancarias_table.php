<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tarjeta_bancarias', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_usuario')->constrained('usuarios')->onDelete('cascade');
            $table->string('numero_tarjeta', 19)->unique();
            $table->string('fecha_caducidad', 5);
            $table->string('cvv', 4);
            $table->string('estado', 20)->default('inactivo'); // activo | inactivo
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tarjeta_bancarias');
    }
};
