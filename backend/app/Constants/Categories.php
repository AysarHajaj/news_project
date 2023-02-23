<?php

namespace App\Constants;

use App\Constants\Sources;

class Categories
{
    const BUSINESS = "business";
    const ENTERTAINMENT = "entertainment";
    const GENERAL = "general";
    const HEALTH = "health";
    const SCIENCE = "science";
    const SPORTS = "sports";
    const TECHNOLOGY = "technology";

    const ALL = [
        self::BUSINESS => [
            "id" => self::BUSINESS,
            "label" => "Business",
            Sources::NEWS_API => self::BUSINESS,
            Sources::GUARDIAN_API => self::BUSINESS,
            Sources::NEW_YORK_TIMES_API => self::BUSINESS,
        ],
        self::ENTERTAINMENT => [
            "id" => self::ENTERTAINMENT,
            "label" => "Entertainment",
            Sources::NEWS_API => self::ENTERTAINMENT,
            Sources::GUARDIAN_API => self::ENTERTAINMENT,
            Sources::NEW_YORK_TIMES_API => self::ENTERTAINMENT,
        ],
        self::GENERAL => [
            "id" => self::GENERAL,
            "label" => "General",
            Sources::NEWS_API => self::GENERAL,
            Sources::GUARDIAN_API => self::GENERAL,
            Sources::NEW_YORK_TIMES_API => self::GENERAL,
        ],
        self::HEALTH => [
            "id" => self::HEALTH,
            "label" => "Health",
            Sources::NEWS_API => self::HEALTH,
            Sources::GUARDIAN_API => self::HEALTH,
            Sources::NEW_YORK_TIMES_API => self::HEALTH,
        ],
        self::SCIENCE => [
            "id" => self::SCIENCE,
            "label" => "Science",
            Sources::NEWS_API => self::SCIENCE,
            Sources::GUARDIAN_API => self::SCIENCE,
            Sources::NEW_YORK_TIMES_API => self::SCIENCE,
        ],
        self::SPORTS => [
            "id" => self::SPORTS,
            "label" => "Sports",
            Sources::NEWS_API => self::SPORTS,
            Sources::GUARDIAN_API => "sport",
            Sources::NEW_YORK_TIMES_API => self::SPORTS,
        ],
        self::TECHNOLOGY => [
            "id" => self::TECHNOLOGY,
            "label" => "Technology",
            Sources::NEWS_API => self::TECHNOLOGY,
            Sources::GUARDIAN_API => self::TECHNOLOGY,
            Sources::NEW_YORK_TIMES_API => self::TECHNOLOGY,
        ],
    ];
}
