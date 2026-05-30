<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class DiscosPost extends FormRequest
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
            'nombre'=> 'required|string|max:50',
            'id_genero' => 'required',
            'portada' => 'file|max:3000||mimes:jpeg,jpg,png,webp,svg',
        ];
    }
/**
 * Undocumented function
 *
 * @return void
 */
     public function messages() {
        return [
            'nombre.required' => 'El nombre es obligatorio',
            'nombre.max' => 'El nombre no puede superar los 50 carácteres',
            'nombre.string' => 'El nombre no puede estar vacío',
            'id_genero' => 'Tienes que elegir género para el disco',
            'portada.max' => 'La portada no puede superar los 3mb',
            'portada.mimes' => 'El avatar solo puede ser jpeg,jpg,png,webp,svg',
          
        ];
    }
}
