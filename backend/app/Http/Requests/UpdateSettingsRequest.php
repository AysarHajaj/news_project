<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class UpdateSettingsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function messages()
    {
        return [
            'sources.required' => 'You need to choose the data source',
            'sources.array' => 'Sources must be array of strings',
            'category.present' => 'The payload should contain category key'
        ];
    }



    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'sources' => "required|array",
            'category' => "present"
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
