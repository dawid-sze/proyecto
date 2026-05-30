<?php

namespace Database\Seeders;

use App\Models\Pais;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PaisSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $paises = [
    ['nombre_pais' => 'España', 'bandera' => 'https://flagcdn.com/es.svg'],
    ['nombre_pais' => 'Polonia', 'bandera' => 'https://flagcdn.com/pl.svg'],
    ['nombre_pais' => 'Japón', 'bandera' => 'https://flagcdn.com/jp.svg'],
    ['nombre_pais' => 'Francia', 'bandera' => 'https://flagcdn.com/fr.svg'],
    ['nombre_pais' => 'China', 'bandera' => 'https://flagcdn.com/cn.svg'],
];

    foreach ($paises as $pais) {
        Pais::create($pais);
    }
    }
}
