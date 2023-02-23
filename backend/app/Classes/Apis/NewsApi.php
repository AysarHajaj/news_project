<?php

namespace App\Classes\Apis;

use App\Interfaces\ApiInterface;

class NewsApi extends Api implements ApiInterface
{
    public function getEnvData()
    {
        return [
            "base_url" => env('NEWS_URL'),
            'api_key' => env('NEWS_API_KEY')
        ];
    }
}
