<?php

use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\DataController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\UserController;
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

Route::get(
    'unauthenticated',
    [AuthenticationController::class, 'unauthenticated']
)->name('unauthenticated');

Route::middleware('auth:api')->group(function () {
    Route::prefix('settings')->group(function () {
        Route::get('/', [SettingController::class, 'show']);
        Route::put('/{id}', [SettingController::class, 'update']);
    });

    Route::post(
        'get-data',
        [DataController::class, 'getData']
    );

    Route::get(
        'logout',
        [AuthenticationController::class, 'logout']
    );

    Route::put(
        'profile',
        [UserController::class, 'update']
    );

    Route::get(
        'settings/options',
        [SettingController::class, 'getOptions']
    );
});
