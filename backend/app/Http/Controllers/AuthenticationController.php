<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegistrationRequest;
use App\Services\AuthService;

class AuthenticationController extends Controller
{
    private $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function register(RegistrationRequest $request)
    {
        try {
            $input = $request->only(['name', 'email', 'password']);
            $response = $this->authService->register($input);

            return response()->json($response, 200);
        } catch (\Throwable $th) {
            $response = ["error" => $th->getMessage()];

            return response()->json($response, 500);
        }
    }

    public function login(LoginRequest $request)
    {
        try {
            $input = $request->only(['email', 'password']);
            $response = $this->authService->login($input);

            return response()->json($response, 200);
        } catch (\Throwable $th) {
            $response = ["error" => $th->getMessage()];

            return response()->json($response, 500);
        }
    }

    public function logout()
    {
        try {
            $response = $this->authService->logout();

            return response()->json($response, 200);
        } catch (\Throwable $th) {
            $response = ["error" => $th->getMessage()];

            return response()->json($response, 500);
        }
    }

    public function unauthenticated()
    {
        $response = $this->authService->unauthenticated();

        return response()->json($response, 403);
    }
}
