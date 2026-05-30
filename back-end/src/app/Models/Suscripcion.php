<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Suscripcion extends Model
{
    public $timestamps = false;
    protected $table = 'suscripciones';
    protected $fillable = ['suscripcion', 'fecha_suscripcion', 'id_usuario'];
}
