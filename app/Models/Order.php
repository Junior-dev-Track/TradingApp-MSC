<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'profile_id',
        'symbol',
        'quantity',
        'type',
        'price',
        'stop_price',
        'buy_stop_price',
    ];

    protected $hidden = [
        'profile_id',
    ];

    public function profile()
    {
        return $this->belongsTo(Profile::class);
    }
}
