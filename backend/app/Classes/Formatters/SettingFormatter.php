<?php

namespace App\Classes\Formatters;

class SettingFormatter
{
    public function format($setting)
    {
        $sources = $setting->sources->pluck('source');
        unset($setting->sources);
        $setting->sources = $sources;

        return $setting;
    }
}
