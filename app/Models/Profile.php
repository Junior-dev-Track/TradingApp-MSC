<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'first_name',
        'last_name',
        'address',
        'wallet',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'user_id',
        'first_name',
        'last_name',
        'address',
        'wallet',
    ];

    public static function getWallet($userId)
    {
        return Profile::where('user_id', $userId)->pluck('wallet')->first();
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function wires()
    {

        return $this->hasMany(Wire::class);
    }

    public function trades()
    {
        return $this->hasMany(Trade::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
