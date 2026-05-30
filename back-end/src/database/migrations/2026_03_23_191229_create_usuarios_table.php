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
        Schema::create('usuarios', function (Blueprint $table) {
            $table->id();
            $table->string('nombre_grupo',50);
            $table->string('nombre',20);
            $table->string('apellidos',50);
            $table->string('password',255);
            $table->string('remember_token',100)->nullable();
            $table->string('email',50)->unique();
            $table->string('avatar',300)->nullable();
            $table->string('rol',20)->default('user');
            $table->string('suscripcion',20)->default(false);
            $table->foreignId('id_pais')->constrained('pais')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('usuarios');
    }
};
