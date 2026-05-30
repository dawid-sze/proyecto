<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Mensaje extends Model
{
    public $timestamps = false;
    protected $table = 'mensajes';
    protected $fillable = ['contenido','id_emisor', 'id_cancion'];

    public function emisor()
    {
        return $this->belongsTo(Usuario::class, 'id_emisor', 'id');
    }
}
