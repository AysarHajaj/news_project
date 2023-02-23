<?php

namespace App\Classes\QueryBuilders;

use App\Interfaces\QueryBuilderInterface;

class NewYorkTimesQueryBuilder implements QueryBuilderInterface
{
    public function build($input, $apiKey)
    {
        $query  = [
            "api-key" => $apiKey,
            "page" => 0
        ];

        if (isset($input['search_text'])) {
            $query['q'] = $input['search_text'];
        }
        if (isset($input['from_date'])) {
            $query['begin_date'] = $input['from_date'];
        }
        if (isset($input['to_date'])) {
            $query['end_date'] = $input['to_date'];
        }
        if (isset($input['category'])) {
            $query['fq'] = 'news_desk:("' . $input['category'] . '")';
        }
        if (isset($input['page'])) {
            $query['page'] = ($input['page'] - 1);
        }

        return ["query" => $query];
    }
}
