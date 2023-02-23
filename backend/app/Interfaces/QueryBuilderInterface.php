<?php

namespace App\Interfaces;

interface QueryBuilderInterface
{
    public function build($input, $apiKey);
}
