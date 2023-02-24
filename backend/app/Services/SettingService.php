<?php

namespace App\Services;

use App\Classes\Formatters\SettingFormatter;
use App\Constants\Categories;
use App\Constants\Sources;
use App\Models\Setting;
use App\Models\SettingSource;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class SettingService
{
    private $settingFormatter;

    public function __construct(SettingFormatter $settingFormatter)
    {
        $this->settingFormatter = $settingFormatter;
    }

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

    public function get()
    {
        DB::beginTransaction();
        try {
            $user = Auth::user();
            $user->load([
                'setting' => function ($q) {
                    $q->with(['sources']);
                }
            ]);

            $response = [
                'result' => $this->formateSetting($user->setting)
            ];

            DB::commit();
            return $response;
        } catch (\Throwable $th) {
            DB::rollBack();
            throw new Exception($th->getMessage());
        }
    }

    public function formateSetting($setting)
    {
        return $this->settingFormatter->format($setting);
    }

    public function getOptions()
    {
        try {
            $response = [
                'result' => [
                    'sources' => Sources::ALL,
                    'categories' => array_values(Categories::ALL)
                ]
            ];

            return $response;
        } catch (\Throwable $th) {
            throw new Exception($th->getMessage());
        }
    }
}
