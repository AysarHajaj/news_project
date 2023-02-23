<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegistrationRequest;
use Illuminate\Http\Request;

class AuthenticationController extends Controller
{
    public function register(RegistrationRequest $request)
    {
        try {
            $input = $request->only(['name', 'email', 'password']);
            $response = [];

            return response()->json($response, 200);
        } catch (\Throwable $th) {
            $response = ["error" => $th->getMessage()];

            return response()->json($response, 500);
        }
    }
}
