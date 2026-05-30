<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pais extends Model
{
    public $timestamps = false;
    protected $table = 'pais';
    protected $fillable = ['nombre_pais', 'bandera'];

    public function bandas()
    {
        return $this->hasMany(Usuario::class, 'id_pais');
    }
}
