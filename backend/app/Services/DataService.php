<?php

namespace App\Services;

use App\Classes\Apis\GuardianApi;
use App\Classes\Apis\NewsApi;
use App\Classes\Apis\NewYorkTimesApi;
use App\Classes\Formatters\GuardianFormatter;
use App\Classes\Formatters\NewsFormatter;
use App\Classes\Formatters\NewYorkTimesFormatter;
use App\Classes\QueryBuilders\GuardianQueryBuilder;
use App\Classes\QueryBuilders\NewsQueryBuilder;
use App\Classes\QueryBuilders\NewYorkTimesQueryBuilder;
use App\Constants\Sources;

class DataService
{
    public function getData($input)
    {
        $result = [
            "articles" => [],
            "pages" => 0
        ];

        foreach ($input['sources'] as $source) {
            if ($source == Sources::NEWS_API) {
                $api = new NewsApi(
                    new NewsFormatter,
                    new NewsQueryBuilder
                );

                $result = $this->exec($result, $api, $input);
            }
            if ($source == Sources::GUARDIAN_API) {
                $api = new GuardianApi(
                    new GuardianFormatter,
                    new GuardianQueryBuilder
                );
                $result = $this->exec($result, $api, $input);
            }
            if ($source == Sources::NEW_YORK_TIMES_API) {
                $api = new NewYorkTimesApi(
                    new NewYorkTimesFormatter,
                    new NewYorkTimesQueryBuilder
                );
                $result = $this->exec($result, $api, $input);
            }
        }

        return ["result" => $result];
    }

    public function exec($currentData, $api, $input)
    {
        $newData = $api->get($input);
        $numberOfPages = $this->maxNumberOfPages(
            $currentData['pages'],
            $newData['pages']
        );

        return [
            "articles" => [...$currentData['articles'], ...$newData['articles']],
            "pages" => $numberOfPages
        ];
    }

    public function maxNumberOfPages($current, $coming)
    {
        if ($coming > $current) {
            return $coming;
        }

        return $current;
    }
}
