<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

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

        return Inertia::render('Dashboard', ['barsData' => $barsData]);
    }
}
