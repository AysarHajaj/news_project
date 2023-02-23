<?php

namespace App\Classes\Apis;

use App\Interfaces\FormatterInterface;
use App\Interfaces\QueryBuilderInterface;

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
}
