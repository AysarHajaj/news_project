<?php

namespace App\Classes\QueryBuilders;

use App\Interfaces\QueryBuilderInterface;

class GuardianQueryBuilder implements QueryBuilderInterface
{
    public function build($input, $apiKey)
    {
        $query  = [
            "api-key" => $apiKey,
            "page-size" => 10,
            "page" => 1
        ];

        if (isset($input['search_text'])) {
            $query['q'] = $input['search_text'];
        }
        if (isset($input['from_date'])) {
            $query['from-date'] = $input['from_date'];
        }
        if (isset($input['to_date'])) {
            $query['to-date'] = $input['to_date'];
        }
        if (isset($input['category'])) {
            $query['section'] = $input['category'];
        }
        if (isset($input['page'])) {
            $query['page'] = $input['page'];
        }

        return ["query" => $query];
    }
}
