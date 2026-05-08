<?php

namespace App\Http\Requests;

use App\Models\Game;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class GameRequest extends FormRequest
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
            'start_time' => ['date'],
            'status' => [Rule::in('pending', 'started', 'finished')],
            'round_id' => ['required', 'integer', 'exists:rounds,id'],
            'white_player_id' => ['nullable', 'integer', 'exists:players,id'],
            'black_player_id' => ['nullable', 'integer', 'exists:players,id'],
            'winner_player_id' => ['nullable', 'integer', 'exists:players,id'],
        ];
    }
}
