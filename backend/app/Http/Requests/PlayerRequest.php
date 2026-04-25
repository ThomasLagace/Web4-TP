<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class PlayerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'username' => ['required', 'string', 'max:30'],
            'affiliation' => ['required', 'string', 'max:70'],
            'points' => ['required', 'integer'],
            'is_eliminated' => ['required', 'boolean'],
            'tournament_id' => ['required', 'integer', 'exists:tournaments,id'],
        ];
    }
}
