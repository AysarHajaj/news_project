<?php

namespace App\Classes\Apis;

use App\Interfaces\FormatterInterface;
use App\Interfaces\QueryBuilderInterface;
use GuzzleHttp\Client;

class Api
{
    private $formatter;
    private $builder;

    public function __construct(
        FormatterInterface $formatter,
        QueryBuilderInterface $builder
    ) {
        $this->formatter = $formatter;
        $this->builder = $builder;
    }

    public function get($input)
    {
        $envData = $this->getEnvData();
        return $this->exec($envData['base_url'], $envData['api_key'], $input);
    }

    public function exec($baseUrl, $apiKey, $input)
    {
        $client = new Client();
        $query = $this->builder->build($input, $apiKey);

        try {
            $response = $client->request('GET', $baseUrl, $query);
            $content = json_decode($response->getBody(), true);
        } catch (\Throwable $th) {
            $content = [];
        }

        $result = $this->formatter->format(
            $content,
            $this->getCategoryIfExists($input)
        );

        return $result;
    }

    public function getCategoryIfExists($input)
    {
        return isset($input['category']) ? $input['category'] : null;
    }
}
