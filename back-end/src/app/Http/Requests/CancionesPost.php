<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class CancionesPost extends FormRequest
{
   /**
    * Undocumented function
    *
    * @return boolean
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
            'nombre_cancion'=> 'required|string|max:50|unique:canciones,nombre_cancion',
            'cancion' => 'required|file|max:8000|mimetypes:audio/*',
            'id_disco' => 'required',
            
        ];
    }
/**
 * Undocumented function
 *
 * @return void
 */
     public function messages() {
        return [
            'nombre_cancion.required' => 'El nombre es obligatorio',
            'nombre_cancion.max' => 'El nombre no puede superar los 50 carácteres',
            'nombre_cancdcion.string' => 'El nombre no puede estar vacío',
            'nombre_cancion.unique' => 'El nombre ya existe',
            'cancion.required' => 'Inserte una cancion',
            'cancion.max' => 'La canción no puede superar los 10mb',
            'id_disco.required' => 'Selecciona un disco'
          
        ];
    }
}
