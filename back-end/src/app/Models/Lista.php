<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lista extends Model
{
    public $timestamps = false;
    protected $table = 'listas';
    protected $fillable = ['nombre_lista','id_propietario'];

    public function propietario()
    {
        return $this->belongsTo(Usuario::class);
    }

    public function canciones()
    {
        return $this->belongsToMany(Cancion::class, 'listas_canciones', 'lista_id', 'cancion_id');
    }
}
