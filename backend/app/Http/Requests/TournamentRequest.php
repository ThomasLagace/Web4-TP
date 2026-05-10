<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class TournamentRequest extends FormRequest
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
        if ($this->method() === 'POST') {
            return [
                'name' => ['required', 'string', 'max:50'],
                'start_date' => ['required', 'date'],
                'prize' => ['required', 'integer', 'min:0'],
                'player_ids' => ['required', 'array', 'min:16', 'max:16'],
                'player_ids.*' => ['integer', 'exists:players,id', 'distinct']
            ];
        } else {
            return [
                'name' => ['required', 'string', 'max:50'],
                'start_date' => ['required', 'date'],
                'prize' => ['required', 'integer', 'min:0'],
            ];
        }
    }
}
