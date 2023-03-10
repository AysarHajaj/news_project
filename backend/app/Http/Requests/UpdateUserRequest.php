<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class UpdateUserRequest extends FormRequest
{

    public function messages()
    {
        return [
            'name.required' => 'You need to enter your name',
            'email.required' => 'You need to enter your email',
            'email.email' => 'The email should be email structured',
            'email.unique' => 'The email you entered already exists',
            'password.confirmed' => 'The password confirmation should match you password',
        ];
    }



    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        $user = Auth::user();
        return [
            "name" => "required",
            "email" => "required|email|unique:users,email," . $user->id,
            "password" => "confirmed",
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        $response = new JsonResponse([
            'error' => $validator->errors()->first(),
        ], 400);

        throw new ValidationException($validator, $response);
    }
}
