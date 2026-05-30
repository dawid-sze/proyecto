<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Usuario;

class UsuarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         Usuario::create([
            'nombre_grupo' => 'Admin',
            'nombre'       => 'Admin',
            'apellidos'    => 'Admin',
            'password'     => bcrypt('admin1234'),
            'email'        => 'admin@gmail.com',
            'avatar'       => null,
            'rol'          => 'admin',
            'suscripcion'  => true,
            'id_pais'      => 1,
        ]);
    }
}
