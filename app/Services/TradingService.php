<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class TradingService
{
    public function getHistoricalbars()
    {
        try {
            $data = [];
            $nextPageUrl = null;

            do {
                // Fetch data with the pagination URL
                $response = Http::withHeaders([
                    'APCA-API-KEY-ID' => config('services.alpaca.key'),
                    'APCA-API-SECRET-KEY' => config('services.alpaca.secret'),
                    'Accept' => 'application/json',
                ])->get($nextPageUrl ?: 'https://data.alpaca.markets/v2/stocks/bars', [
                    'symbols' => 'AAPL',
                    'timeframe' => '1Min',
                    'start' => '2024-01-01T00:00:00Z',
                    'limit' => 1000,
                    'adjustment' => 'raw',
                    'feed' => 'iex',
                    'sort' => 'asc',
                ]);

                $responseData = $response->json();
                $data = array_merge($data, $responseData);

                // Update the pagination URL for the next page
                $nextPageUrl = isset($responseData['next_page_url']) ? $responseData['next_page_url'] : null;
            } while ($nextPageUrl);

            return $data;
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
