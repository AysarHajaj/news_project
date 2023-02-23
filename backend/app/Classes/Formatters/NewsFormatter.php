<?php

namespace App\Classes\Formatters;

use App\Interfaces\FormatterInterface;

class NewsFormatter extends Formatter implements FormatterInterface
{
    public function format($data, $category)
    {
        $result = [
            "articles" => [],
            "pages" => 0
        ];

        if (isset($data['articles'])) {
            $articles = [];

            foreach ($data['articles'] as $article) {
                $articles[] = [
                    "author" => $article['author'],
                    "date" => $this->formateDate($article['publishedAt']),
                    "title" => $article['title'],
                    "url" => $article['url'],
                    "source" => "News Api",
                    "category" => $category
                ];
            }

            $result = [
                "articles" => $articles,
                "pages" => $this->getNumberOfPages($data)
            ];
        }

        return $result;
    }

    public function getNumberOfPages($data)
    {
        return ceil($data['totalResults'] / 10);
    }
}
