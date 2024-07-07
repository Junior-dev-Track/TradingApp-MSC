<?php

namespace App\Services;

use Illuminate\Http\Request;

use App\Models\Trade;

class TradeBuySell
{

    public function create(Request $request, $closePrice, $profile, $symbol): void
    {
        $trade = Trade::create([
            'profile_id' => $profile->id,
            'symbol' => $symbol,
            'quantity' => $request->input('quantity'),
            'open_price' => $closePrice,
        ]);

        $trade->update(['updated_at' => now()]);

        $profile->update([
            'wallet' => $profile->wallet - ($request->input('quantity') * $closePrice),
        ]);
    }

    public function add(Request $request, $closePrice, $existingOpenTrade, $profile): void
    {
        $newQuantity = $existingOpenTrade->quantity + $request->input('quantity');

        $existingOpenTrade->update(['quantity' => $newQuantity, 'open_price' => $closePrice,]);

        $profile->update([
            'wallet' => $profile->wallet - $request->input('quantity') * $closePrice,
        ]);
    }

    public function sellSome(Request $request, $closePrice, $existingOpenTrade, $profile): void
    {
        $newQuantity = $existingOpenTrade->quantity - $request->input('quantity');

        $existingOpenTrade->update([
            'quantity' => $newQuantity,
        ]);

        $profile->update([
            'wallet' => $profile->wallet + $request->input('quantity') * $closePrice,
        ]);
    }

    public function sellAll(Request $request, $closePrice, $existingOpenTrade, $profile): void
    {
        $existingOpenTrade->update([
            'close_price' => $closePrice,
            'close_datetime' => now(),
            'open' => false,
        ]);

        $profile->update([
            'wallet' => $profile->wallet + $request->input('quantity') * $closePrice,
        ]);
    }
}
