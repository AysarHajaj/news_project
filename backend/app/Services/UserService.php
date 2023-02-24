<?php

namespace App\Services;

use App\Classes\Formatters\SettingFormatter;
use App\Constants\Sources;
use App\Models\Setting;
use App\Models\SettingSource;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UserService
{
    public function update($input)
    {
        DB::beginTransaction();
        try {
            $user = Auth::user();
            User::where('id', $user->id)->update([
                'email' => $input['email'],
                'name' => $input['name'],
                'password' => bcrypt($input['password'])
            ]);

            $response = [
                "result" => true
            ];

            DB::commit();
            return $response;
        } catch (\Throwable $th) {
            DB::rollBack();
            throw new Exception($th->getMessage());
        }
    }
}
