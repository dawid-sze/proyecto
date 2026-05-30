<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cancion extends Model
{
    public $timestamps = false;
    protected $table = 'canciones';
    protected $fillable = ['nombre_cancion', 'cancion', 'reproducciones', 'id_disco'];

    public function disco()
    {
      return $this->belongsTo(Disco::class, 'id_disco');
    }

    public function canciones()
    {
        return $this->belongsToMany(Lista::class, 'listas_canciones', 'lista_id', 'cancion_id');
    }

    public function comentarios()
    {
        return $this->hasMany(Mensaje::class, "id_cancion");
    }

    public function gustan(){
        return $this->belongsToMany(Usuario::class, "usuarios_canciones", 'id_usuario','id_cancion');
    }
}
