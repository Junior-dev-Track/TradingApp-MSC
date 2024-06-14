<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

use App\Services\TradingService;

class DashboardController extends Controller
{
    protected $tradingService;

    public function __construct(TradingService $tradingService)
    {
        $this->tradingService = $tradingService;
    }
    public function index()
    {
        $barsData = $this->tradingService->getHistoricalBars();

        return Inertia::render('Dashboard', ['barsData' => $barsData]);
    }
}
