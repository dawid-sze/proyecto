<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class ListasPost extends FormRequest
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
            'nombre_lista'=> 'required|string|max:50'
        ];
    }
/**
 * Undocumented function
 *
 * @return void
 */
     public function messages() {
        return [
            'nombre_lista.required' => 'El nombre es obligatorio',
            'nombre_lista.max' => 'El nombre no puede superar los 50 carácteres',
            'nombre_lista.string' => 'El nombre no puede estar vacío'
        ];
    }
    
}