<?php

namespace App\Classes\Apis;

use App\Interfaces\ApiInterface;

class GuardianApi extends Api implements ApiInterface
{
    public function getEnvData()
    {
        return [
            "base_url" => env('GUARDIAN_URL'),
            'api_key' => env('GUARDIAN_API_KEY')
        ];
    }
}
