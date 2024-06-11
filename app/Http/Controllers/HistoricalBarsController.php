<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;


class HistoricalBarsController extends Controller
{
    public function index()
    {
        try {
            $response = Http::withHeaders([
                'APCA-API-KEY-ID' => config('services.alpaca.key'),
                'APCA-API-SECRET-KEY' => config('services.alpaca.secret'),
                'Accept' => 'application/json',
            ])->get('https://data.alpaca.markets/v2/stocks/bars', [
                'symbols' => 'AAPL',
                'timeframe' => '1Day',
                'start' => '2022-01-01T00:00:00Z',
                'limit' => 1000,
                'adjustment' => 'raw',
                'feed' => 'iex',
                'sort' => 'asc'
            ]);

            return $response->json();
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
