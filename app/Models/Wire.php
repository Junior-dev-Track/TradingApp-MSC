<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wire extends Model
{
    use HasFactory;

    protected $fillable = [
        'profile_id',
        'amount',
        'withdrawal',
    ];



    public static function getUserWires($userId)
    {
        return self::where('profile_id', $userId)->get();
    }

    public static function getRecentWires($userId)
    {
        return self::where('profile_id', $userId)->take(3)->get();
    }

    public function profile()
    {
        return $this->belongsTo(Profile::class);
    }
}
