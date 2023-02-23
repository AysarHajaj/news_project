<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateSettingsRequest;
use App\Services\SettingService;

class SettingController extends Controller
{
    private $settingService;

    public function __construct(SettingService $settingService)
    {
        $this->settingService = $settingService;
    }

    public function update(UpdateSettingsRequest $request, $id)
    {
        try {
            $input = $request->only(['sources', 'category']);
            $response = $this->settingService->update($input, $id);

            return response()->json($response, 200);
        } catch (\Throwable $th) {
            $response = ["error" => $th->getMessage()];

            return response()->json($response, 500);
        }
    }

    public function show()
    {
        try {
            $response = $this->settingService->get();

            return response()->json($response, 200);
        } catch (\Throwable $th) {
            $response = ["error" => $th->getMessage()];

            return response()->json($response, 500);
        }
    }
}
