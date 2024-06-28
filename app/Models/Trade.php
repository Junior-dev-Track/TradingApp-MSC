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

    public function __construct(APIFetch $apiFetch)
    {
        $this->apiFetch = $apiFetch;
    }

    public static function getOpenTrades($profileId, $symbol)
    {
        return self::where('profile_id', $profileId)->where('symbol', $symbol)->where('open', true)->get();
    }

    public static function getOpenTradesWithQuantitySum($profileId, $symbol)
    {
        $openTrades = self::getOpenTrades($profileId, $symbol);

        $totalAsset = 0;
        foreach ($openTrades as $trade) {
        }

        $quantitySum = $openTrades->sum('quantity');

        return $quantitySum;
    }


    public function profile()
    {
        return $this->belongsTo(Profile::class);
    }
}
