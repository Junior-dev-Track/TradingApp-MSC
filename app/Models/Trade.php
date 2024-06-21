<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Trade extends Model
{
    use HasFactory;

    protected $fillable = [
        'profile_id',
        'symbol',
        'quantity',
        'open_price',
        'close_price',
        'open',
    ];

    protected $hidden = [
        'profile_id',
    ];

    public static function getOpenWires($profileId, $symbol)
    {
        return self::where('profile_id', $profileId)->where('symbol', $symbol)->where('open', true)->get();
    }

    public function profile()
    {
        return $this->belongsTo(Profile::class);
    }
}
