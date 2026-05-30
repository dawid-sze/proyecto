<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    public $timestamps = false;
    protected $table = 'chats';

    public function chats()
    {
        return $this->belongsToMany(Usuario::class, "usuarios_chats", 'id_usuario','id_chat');
    }

    public function mensajes(){
        return $this->hasMany(Mensaje::class, "id_conversacion");
    }
}

