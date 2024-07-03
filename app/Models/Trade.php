<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Services\APIFetch;

class Trade extends Model
{
    use HasFactory;

    protected $apiFetch;

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

    public $timestamps = false;


    public static function getOpenTradeBySymbol($profileId, $symbol)
    {
        return self::where('profile_id', $profileId)->where('symbol', $symbol)->where('open', true)->first();
    }


    public static function getOpenTrades($profileId)
    {
        return self::where('profile_id', $profileId)->where('open', true)->get();
    }


    public function profile()
    {
        return $this->belongsTo(Profile::class);
    }
}
