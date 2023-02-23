<?php

namespace App\Services;

use App\Models\User;
use Exception;
use Illuminate\Support\Facades\DB;

class AuthService
{
    public function register($input)
    {
        DB::beginTransaction();
        try {
            $input['password'] = bcrypt($input['password']);

            $user = User::create($input);

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
}
