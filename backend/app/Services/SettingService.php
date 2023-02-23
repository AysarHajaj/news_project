<?php

namespace App\Services;

use App\Constants\Sources;
use App\Models\Setting;
use App\Models\SettingSource;

class SettingService
{
    public function addSettingForRegisteredUser($userId)
    {
        $setting = Setting::create([
            'user_id' => $userId
        ]);

        $this->insertSettingSources(
            array_column(Sources::ALL, 'id'),
            $setting->id
        );
    }

    public function insertSettingSources($sources, $settingId)
    {
        $settingSourcesData = [];
        foreach ($sources as $source) {
            $settingSourcesData[] = [
                'setting_id' => $settingId,
                'source' => $source
            ];
        }

        SettingSource::insert($settingSourcesData);
    }
}
