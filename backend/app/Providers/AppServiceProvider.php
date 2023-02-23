<?php

namespace App\Providers;

use App\Classes\Formatters\SettingFormatter;
use App\Services\SettingService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind('App\Services\SettingService', function ($app) {
            return new SettingService(new SettingFormatter());
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
