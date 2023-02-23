<?php

namespace App\Services;

use App\Constants\Sources;
use App\Models\Setting;
use App\Models\SettingSource;
use Exception;
use Illuminate\Support\Facades\DB;

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

    public function update($input, $id)
    {
        DB::beginTransaction();
        try {
            Setting::where('id', $id)->update([
                "category" => $input['category']
            ]);

            SettingSource::where('setting_id', $id)->delete();
            $this->insertSettingSources($input['sources'], $id);

            $response = [
                "result" => true
            ];

            DB::commit();
            return $response;
        } catch (\Throwable $th) {
            DB::rollBack();
            throw new Exception($th->getMessage());
        }
    }
}
