<?php
namespace App\Models;
// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Usuario extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasApiTokens;
   
    public $timestamps = false;
    protected $table = 'usuarios';
    protected $fillable = ['nombre_grupo','nombre','apellidos','password','email','avatar','rol','suscripcion','id_pais'];

     /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    
    public function discos(){
        return $this->hasMany(Disco::class, "id_grupo");
    }

    public function listas(){
        return $this->hasMany(Lista::class, "id_propietario");
    }

    public function tarjetas(){
        return $this->hasMany(TarjetaBancaria::class, 'id_usuario');
    }

    public function mensajes(){
        return $this->hasMany(Mensaje::class, "id_emisor");
    }

    public function pais()
    {
        return $this->belongsTo(Pais::class, 'id_pais', 'id');
    }

    public function chats()
    {
        return $this->belongsToMany(Chat::class, "usuarios_chats", 'id_usuario','id_chat');
    }

   public function amigos()
    {
        return $this->belongsToMany(Usuario::class, "amistad", 'usuario_id','amigo_id');
    }

     public function masEscuchados()
    {
        return $this->belongsToMany(Genero::class, "usuarios_generos", 'id_usuario','id_genero')->withPivot("reproducciones");
    }

    public function suscripcion_real(){
        return $this->hasOne(Suscripcion::class, 'id_usuario');
    }

     public function likes(){
        return $this->belongsToMany(Cancion::class, "usuarios_canciones", 'id_usuario','id_cancion');
    }

}