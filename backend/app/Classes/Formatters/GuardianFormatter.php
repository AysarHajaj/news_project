<?php

namespace App\Classes\Formatters;

use App\Interfaces\FormatterInterface;

class GuardianFormatter extends Formatter implements FormatterInterface
{
    public function format($data, $category)
    {
        $result = [
            "articles" => [],
            "pages" => 0
        ];

        if (isset($data['response'])) {
            $articles = [];
            foreach ($data['response']['results'] as $article) {
                $articles[] = [
                    "author" => null,
                    "date" => $this->formateDate($article['webPublicationDate']),
                    "title" => $article['webTitle'],
                    "url" => $article['webUrl'],
                    "source" => "Guardian Api",
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
        return $data['response']['pages'];
    }
}
