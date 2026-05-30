<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UsuarioUpdate extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Undocumented function
     *
     * @return void
     */
    public function rules()
{
    $usuarioId = $this->route('usuario'); // Asegúrate que el parámetro en tu route:list sea {usuario}

    return [
        // La coma ANTES del punto es parte del string de Laravel
        'nombre_grupo' => 'nullable|string|max:50|unique:usuarios,nombre_grupo,' . $usuarioId,
        'nombre'       => 'nullable|string|max:20',
        'apellidos'    => 'nullable|string|max:50',
        
        // Importante: nullable para que no sea obligatorio si no se cambia
        'password'     => 'nullable|string|min:6|max:60',
        
        'email'        => 'nullable|string|max:50|unique:usuarios,email,' . $usuarioId,
        
        // 'image' es mejor que 'file' para validar fotos
        'avatar'       => 'nullable|image|max:3000|mimes:jpeg,jpg,png,webp,svg',
    ];
}

     public function messages() {
        return [
            'nombre_grupo.max' => 'El nombre del grupo no puede superar los 20 carácteres',
            'nombre_grupo.string' => 'El nombre del grupo no puede estar vacío',
            'nombre_grupo.unique' => 'Este nombre de grupo ya está en uso',
            'nombre.max' => 'El nombre no puede superar los 20 carácteres',
            'nombre.string' => 'El nombre no puede estar vacío',
            'apellidos.max' => 'El apellido no puede superar los 50 carácteres',
            'apellidos.string' => 'Apellidos no puede estar vacío',
            'password.max' => 'La contraseña no puede superar los 64 carácteres',
            'password.string' => 'El password no puede estar vacío',
            'email.max' => 'El email no puede superar los 50 carácteres',
            'email.string' => 'El email no puede estar vacío',
            'email.unique' => 'Este correo ya está en uso',
            'avatar.max' => 'El avatar no puede superar los 3mb',
            'avatar.mimes' => 'El avatar solo puede ser jpeg,jpg,png,webp,svg'
        ];
    }
}
