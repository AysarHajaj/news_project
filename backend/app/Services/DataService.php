<?php

namespace App\Services;

class DataService
{
    public function getData($input)
    {
        $result = [
            "articles" => [],
            "pages" => 0
        ];

        return $result;
    }
}
