<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class TarjetasPost extends FormRequest
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
            'numero_tarjeta'  => 'required|regex:/^[0-9\s\-]{13,25}$/|unique:tarjeta_bancarias,numero_tarjeta',
            'fecha_caducidad' => ['required', 'regex:#^\d{2}/\d{2}$#'],
            'cvv'             => 'required|digits_between:3,4',
        ];
    }

    public function messages(): array
    {
        return [
            'numero_tarjeta.required'   => 'El número de tarjeta es obligatorio.',
            'numero_tarjeta.regex'      => 'El número debe tener entre 13 y 19 dígitos.',
            'numero_tarjeta.unique'     => 'Este número de tarjeta ya está registrado.',
            'fecha_caducidad.required'  => 'La fecha de caducidad es obligatoria.',
            'fecha_caducidad.regex'     => 'La fecha debe tener el formato MM/AA.',
            'cvv.required'              => 'El CVV es obligatorio.',
            'cvv.digits_between'        => 'El CVV debe tener 3 o 4 dígitos.',
        ];
    }
}
