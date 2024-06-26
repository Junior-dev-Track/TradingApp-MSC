<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

use Illuminate\Http\JsonResponse;

class APIFetch
{
    public function getHistoricalbars(): JsonResponse
    {
        $params = [
            'symbols' => 'AAPL,MSFT,AMZN,GOOGL,GOOG,TSLA,BRK.B,NVDA,JPM,JNJ,V,UNH,HD,PG,MA,DIS,PYPL,BAC,ADBE',
            'timeframe' => '1D',
            'start' => '2024-01-01T00:00:00Z',
            'limit' => 1000,
            'adjustment' => 'raw',
            'feed' => 'iex',
            'sort' => 'asc'
        ];

        $all_data = $this->fetchData($params, 'bars');

        return response()->json($all_data);
    }

    public function getHistoricalbarsBySymbol($symbol): JsonResponse
    {
        $params = [
            'symbols' => $symbol,
            'timeframe' => '1Min',
            'limit' => 1000,
            'adjustment' => 'raw',
            'feed' => 'iex',
            'sort' => 'asc'
        ];

        $symbol_data = $this->fetchData($params, 'bars');

        return response()->json($symbol_data);
    }

    public function getSpecificClosePrice($symbol): JsonResponse
    {
        $params = [
            'symbols' => $symbol,
            'timeframe' => '1Min',
            'start' => date('Y-m-d\TH:i:sP'),
            'limit' => 1000,
            'adjustment' => 'raw',
            'feed' => 'iex',
            'sort' => 'desc'
        ];

        $symbol_data = $this->fetchData($params, 'barsLatest');

        if (count($symbol_data) > 0 && isset($symbol_data[0]['close'])) {
            $closePrice = $symbol_data[0]['close'];
        } else {
            $closePrice = null;
        }

        return response()->json([
            'closePrice' => $closePrice
        ]);
    }

    public function getLastestBars(): JsonResponse
    {
        $params = [
            'symbols' => 'AAPL,MSFT,AMZN,GOOGL,GOOG,TSLA,BRK.B,NVDA,JPM,JNJ,V,UNH,HD,PG,MA,DIS,PYPL,BAC,ADBE',
            'feed' => 'iex'
        ];

        $all_data = $this->fetchData($params, 'barsLatest');

        return response()->json($all_data);
    }

    private function fetchData($params, $type)
    {
        $url = '';

        switch ($type) {
            case 'bars':
                $url = 'https://data.alpaca.markets/v2/stocks/bars';
            case 'barsLatest':
                $url = 'https://data.alpaca.markets/v2/stocks/bars/latest';
        }

        try {
            $all_data = [];
            $next_page_token = null;

            do {
                $response = Http::retry(3, 100)->withHeaders([
                    'APCA-API-KEY-ID' => config('services.alpaca.key'),
                    'APCA-API-SECRET-KEY' => config('services.alpaca.secret'),
                    'Accept' => 'application/json'
                ])->timeout(60)->get($url, array_merge($params, ['page_token' => $next_page_token ?? null]));

                if ($response->failed()) {
                    return response()->json(['error' => 'Failed to fetch data from API'], 500);
                }

                $data = $response->json();

                foreach ($data as $key => $value) {
                    if ($key === 'next_page_token') {
                        $next_page_token = $value;
                    } elseif (is_array($value)) {
                        foreach ($value as $symbol => $bars) {
                            if (!isset($all_data[$symbol])) {
                                $all_data[$symbol] = [];
                            }
                            $all_data[$symbol] = array_merge($all_data[$symbol], $bars);
                        }
                    } else {
                        Log::warning('Unexpected data format received: ' . json_encode($data));
                    }
                }
            } while ($next_page_token);

            return $all_data;
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
