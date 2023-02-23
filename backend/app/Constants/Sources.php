<?php

namespace App\Constants;

class Sources
{
    const NEWS_API = "news_api";
    const GUARDIAN_API = "guardian_api";
    const NEW_YORK_TIMES_API = "nytimes_api";

    const ALL = [
        [
            "id" => self::NEWS_API,
            "label" => "News Api"
        ],
        [
            "id" => self::GUARDIAN_API,
            "label" => "Guardian Api"
        ],
        [
            "id" => self::NEW_YORK_TIMES_API,
            "label" => "New York Times Api"
        ],
    ];
}
