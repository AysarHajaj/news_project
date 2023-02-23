<?php

namespace App\Http\Controllers;

use App\Http\Requests\GetDataRequest;
use App\Services\DataService;
use Illuminate\Http\Request;

class DataController extends Controller
{
    private $dataService;

    public function __construct(DataService $dataService)
    {
        $this->dataService = $dataService;
    }

    public function getData(GetDataRequest $request)
    {
        try {
            $input = $request->only([
                'search_text',
                'category',
                'sources',
                'from_date',
                'to_date',
                'page'
            ]);

            $response = $this->dataService->getData($input);

            return response()->json($response, 200);
        } catch (\Throwable $th) {
            $response = ["error" => $th->getMessage()];
            return response()->json($response, 500);
        }
    }
}
