<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TarjetaBancaria extends Model
{
    public $timestamps = false;
    protected $table = 'tarjeta_bancarias';
    protected $fillable = ['id_usuario', 'numero_tarjeta', 'fecha_caducidad', 'cvv', 'estado'];
    protected $hidden = ['cvv'];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'id_usuario');
    }
}
