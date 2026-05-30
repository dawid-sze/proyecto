<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Genero extends Model
{
    public $timestamps = false;
    protected $table = 'generos';
    protected $fillable = ['nombre_genero'];

    public function discos()
    {
        return $this->hasMany(Disco::class, 'id_genero');
    }
}
