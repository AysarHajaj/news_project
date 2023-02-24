<?php

namespace App\Services;

use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AuthService
{
    private $settingService;

    public function __construct(SettingService $settingService)
    {
        $this->settingService = $settingService;
    }

    public function register($input)
    {
        DB::beginTransaction();
        try {
            $input['password'] = bcrypt($input['password']);

            $user = User::create($input);
            $this->settingService->addSettingForRegisteredUser($user->id);
            $user->load([
                'setting' => function ($q) {
                    $q->with(['sources']);
                }
            ]);
            $user->setting = $this->settingService->formateSetting($user->setting);

            $response = [
                "result" => [
                    "user" => $user,
                    "token" => $user->createToken('innoscripta')->accessToken
                ]
            ];

            DB::commit();
            return $response;
        } catch (\Throwable $th) {
            DB::rollBack();
            throw new Exception($th->getMessage());
        }
    }

    public function login($input)
    {
        DB::beginTransaction();
        try {

            if (Auth::attempt($input)) {
                $user = Auth::user();
                $user->load([
                    'setting' => function ($q) {
                        $q->with(['sources']);
                    }
                ]);
                $user->setting = $this->settingService->formateSetting($user->setting);

                $response = [
                    "result" => [
                        "user" => $user,
                        "token" => $user->createToken('innoscripta')->accessToken
                    ]
                ];
                DB::commit();
                return $response;
            } else {
                throw new Exception("Incorrect Email or Password");
            }
        } catch (\Throwable $th) {
            DB::rollBack();
            throw new Exception($th->getMessage());
        }
    }

    public function logout()
    {
        DB::beginTransaction();
        try {
            $user = Auth::user();
            $user->token()->revoke();

            $response = ["result" => true];
            DB::commit();
            return $response;
        } catch (\Throwable $th) {
            DB::rollBack();
            throw new Exception($th->getMessage());
        }
    }

    public function unauthenticated()
    {
        return ['error' => 'unauthenticated'];
    }
}
