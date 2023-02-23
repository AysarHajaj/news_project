<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SettingSource extends Model
{
    use HasFactory;

    protected $fillable = [
        'source',
        'setting_id',
    ];

    public function setting()
    {
        return $this->belongsTo(Setting::class, 'setting_id');
    }
}
