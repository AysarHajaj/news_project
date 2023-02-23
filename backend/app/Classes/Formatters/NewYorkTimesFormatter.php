<?php

namespace App\Classes\Formatters;

use App\Interfaces\FormatterInterface;

class NewYorkTimesFormatter extends Formatter implements FormatterInterface
{
    public function format($data, $category)
    {
        $result = [
            "articles" => [],
            "pages" => 0
        ];

        if (isset($data['response'])) {
            $articles = [];

            foreach ($data['response']['docs'] as $article) {
                $articles[] = [
                    "author" => $article['byline']['original'],
                    "date" => $this->formateDate($article['pub_date']),
                    "title" => $article['abstract'],
                    "url" => $article['web_url'],
                    "source" => "New York Times Api",
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
        return ceil($data['response']['meta']['hits'] / 10);
    }
}
