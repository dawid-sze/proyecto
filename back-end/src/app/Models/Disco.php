<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Disco extends Model
{
    public $timestamps = false;
    protected $table = 'discos';
    protected $fillable = ['nombre','id_genero','id_grupo','portada'];

     public function grupo()
    {
        return $this->belongsTo(Usuario::class, 'id_grupo');
    }

    public function genero()
    {
        return $this->belongsTo(Genero::class, 'id_genero');
    }

    
    public function canciones()
    {
        return $this->hasMany(Cancion::class, 'id_disco');
    }
}
