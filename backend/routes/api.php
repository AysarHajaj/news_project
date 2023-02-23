<?php

use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\DataController;
use App\Http\Controllers\SettingController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('register', [AuthenticationController::class, 'register']);
Route::post('login', [AuthenticationController::class, 'login']);
Route::middleware('auth:api')->get(
    'logout',
    [AuthenticationController::class, 'logout']
);
Route::get(
    'unauthenticated',
    [AuthenticationController::class, 'unauthenticated']
)->name('unauthenticated');

Route::middleware('auth:api')->prefix('settings')->group(function () {
    Route::get('/', [SettingController::class, 'show']);
    Route::put('/{id}', [SettingController::class, 'update']);
});

Route::middleware('auth:api')->post(
    'get-data',
    [DataController::class, 'getData']
);
