<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UsuariosPost extends FormRequest
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
     * @return array
     */
    public function rules(): array
    {
        return [
            'nombre_grupo'=> 'required|string|max:50|unique:usuarios,nombre_grupo',
            'nombre'=> 'required|string|max:20',
            'apellidos'=> 'string|max:50',
            'password'=> 'required|string|max:60',
            'email' => 'required|string|max:50|unique:usuarios,email',
            'avatar' => 'file|max:3000|mimes:jpeg,jpg,png,webp,svg',
            'id_pais' => 'required',
        ];
    }

     public function messages() {
        return [
            'nombre_grupo.required' => 'El nombre del grupo es obligatorio',
            'nombre_grupo.max' => 'El nombre del grupo no puede superar los 20 carácteres',
            'nombre_grupo.string' => 'El nombre del grupo no puede estar vacío',
            'nombre_grupo.unique' => 'Este nombre de grupo ya está en uso',
            'nombre.required' => 'El nombre es obligatorio',
            'nombre.max' => 'El nombre no puede superar los 20 carácteres',
            'nombre.string' => 'El nombre no puede estar vacío',
            'apellidos.max' => 'El apellido no puede superar los 50 carácteres',
            'apellidos.string' => 'Apellidos no puede estar vacío',
            'password.required' => 'La contraseña es obligatoria',
            'password.max' => 'La contraseña no puede superar los 64 carácteres',
            'password.string' => 'El password no puede estar vacío',
            'email.max' => 'El email no puede superar los 50 carácteres',
            'email.string' => 'El email no puede estar vacío',
            'email.required' => 'El email es obligatorio',
            'email.unique' => 'Este correo ya está en uso',
            'avatar.max' => 'El avatar no puede superar los 3mb',
            'avatar.mimes' => 'El avatar solo puede ser jpeg,jpg,png,webp,svg'
        ];
    }
}
