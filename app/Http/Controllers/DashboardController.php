<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Auth;

use App\Models\Profile;

use App\Services\APIFetch;

class DashboardController extends Controller
{
    protected $apiFetch;

    public function __construct(APIFetch $apiFetch)
    {
        $this->apiFetch = $apiFetch;
    }


    public function index()
    {
        $barsData = $this->apiFetch->getHistoricalBars();
        $barsLatestData = $this->apiFetch->getLastestBars();
        $user_id = Auth::id();
        $wallet = Profile::getWallet($user_id);

        return Inertia::render('Dashboard', ['barsData' => $barsData, 'barsLatestData' => $barsLatestData, 'wallet' => $wallet]);
    }
}
