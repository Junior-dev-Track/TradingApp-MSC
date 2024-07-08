<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;
}

class PriceController extends Controller
{
    private $apiKey;
    private $apiSecret;

    public function __construct()
    {
        $this->apiKey = config('services.alpaca.key');
        $this->apiSecret = config('services.alpaca.secret');
    }

    public function getCurrentPrices()
    {
        $symbols = 'AAPL,MSFT,AMZN,GOOGL,GOOG,TSLA,BRK.B,NVDA,JPM,JNJ,V,UNH,HD,PG,MA,DIS,PYPL,BAC,ADBE';

        // Récupérer les prix actuels
        $currentPrices = $this->fetchCurrentPrices($symbols);

        // Récupérer les prix historiques
        $historicalPrices = $this->fetchHistoricalPrices($symbols);

        // Calculer les différences de prix
        $priceDifferences = $this->calculatePriceDifferences($currentPrices, $historicalPrices);

        return response()->json($priceDifferences);
    }

    private function fetchCurrentPrices($symbols)
    {
        $url = 'https://data.alpaca.markets/v2/stocks/bars/latest';
        $params = [
            'symbols' => $symbols,
            'feed' => 'iex'
        ];

        return $this->fetchData($url, $params);
    }

    private function fetchHistoricalPrices($symbols)
    {
        $startTime = time() - 365 * 24 * 60 * 60;
        $startDate = date('Y-m-d', $startTime);

        $url = 'https://data.alpaca.markets/v2/stocks/bars';
        $params = [
            'symbols' => $symbols,
            'timeframe' => '1D',
            'start' => $startDate,
            'limit' => 1000,
            'adjustment' => 'raw',
            'feed' => 'iex',
            'sort' => 'asc'
        ];

        return $this->fetchData($url, $params);
    }

    private function calculatePriceDifferences($currentPrices, $historicalPrices)
    {
        $priceDifferences = [];

        foreach ($currentPrices as $symbol => $currentData) {
            $latestClosePrice = $currentData[0]['c'] ?? null;
            $historicalClosePrice = end($historicalPrices[$symbol])['c'] ?? null;

            if ($latestClosePrice !== null && $historicalClosePrice !== null) {
                $priceDifferences[$symbol] = $latestClosePrice - $historicalClosePrice;
            } else {
                $priceDifferences[$symbol] = null;
            }
        }

        return $priceDifferences;
    }

    private function fetchData($url, $params)
    {
        try {
            $response = Http::retry(3, 100)->withHeaders([
                'APCA-API-KEY-ID' => $this->apiKey,
                'APCA-API-SECRET-KEY' => $this->apiSecret,
                'Accept' => 'application/json'
            ])->timeout(60)->get($url, $params);

            if ($response->failed()) {
                return ['error' => 'Failed to fetch data from API'];
            }

            return $response->json();
        } catch (\Exception $e) {
            return ['error' => $e->getMessage()];
        }
    }
}
