<?php

namespace App\Classes\QueryBuilders;

use App\Interfaces\QueryBuilderInterface;

class NewsQueryBuilder implements QueryBuilderInterface
{
    public function build($input, $apiKey)
    {
        $query  = [
            "apiKey" => $apiKey,
            "pageSize" => 10,
            "page" => 1
        ];

        if (isset($input['search_text'])) {
            $query['q'] = $input['search_text'];
        }
        if (isset($input['from_date'])) {
            $query['from'] = $input['from_date'];
        }
        if (isset($input['to_date'])) {
            $query['to'] = $input['to_date'];
        }
        if (isset($input['category'])) {
            $query['category'] = $input['category'];
        }
        if (isset($input['page'])) {
            $query['page'] = $input['page'];
        }

        return ["query" => $query];
    }
}
