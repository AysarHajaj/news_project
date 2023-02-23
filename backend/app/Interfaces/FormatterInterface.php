<?php

namespace App\Interfaces;

interface FormatterInterface
{
    public function format($data, $category);
    public function getNumberOfPages($data);
}
