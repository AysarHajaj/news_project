<?php

namespace App\Classes\Formatters;

class Formatter
{
    public function formateDate($date)
    {
        $date = date_create($date);
        return date_format($date, "Y/m/d");
    }
}
