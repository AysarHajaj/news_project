<?php

namespace App\Http\Controllers;

use App\Services\SettingService;

class SettingController extends Controller
{
    private $settingService;

    public function __construct(SettingService $settingService)
    {
        $this->settingService = $settingService;
    }
}
