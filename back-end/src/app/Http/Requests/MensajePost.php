<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class MensajePost extends FormRequest
{
    
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
            'contenido'=> 'required|string|max:255',
        ];
    }

     public function messages() {
        return [
            'contenido.required' => 'El contenido es obligatorio',
            'contenido.max' => 'El contenido no puede superar los 255 carácteres',
            'contenido.string' => 'El contenido no puede estar vacío',
            
        ];
    }
}
