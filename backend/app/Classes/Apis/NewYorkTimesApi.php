<?php

namespace App\Classes\Apis;

use App\Interfaces\ApiInterface;

class NewYorkTimesApi extends Api implements ApiInterface
{
    public function getEnvData()
    {
        return [
            "base_url" => env('NYT_URL'),
            'api_key' => env('NYT_API_KEY')
        ];
    }
}
