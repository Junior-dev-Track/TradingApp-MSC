<?php

namespace App\Services;

use Illuminate\Http\Request;

use App\Models\Trade;

class TradeBuySell
{

    public function create(Request $request, $openPrice, $profile, $symbol): void
    {
        Trade::create([
            'profile_id' => $profile->id,
            'symbol' => $symbol,
            'quantity' => $request->input('quantity'),
            'open_price' => $request->input('open_price'),
        ]);

        $profile->update([
            'wallet' => $profile->wallet - $request->input('quantity') * $openPrice,
        ]);
    }

    public function add(Request $request, $openPrice, $existingOpenTrade, $profile): void
    {
        $newQuantity = $existingOpenTrade->quantity + $request->input('quantity');

        $existingOpenTrade->update(['quantity' => $newQuantity]);

        $profile->update([
            'wallet' => $profile->wallet - $request->input('quantity') * $openPrice,
        ]);
    }

    public function sellSome(Request $request, $openPrice, $existingOpenTrade, $profile): void
    {
        $newQuantity = $existingOpenTrade->quantity - $request->input('quantity');

        $existingOpenTrade->update([
            'quantity' => $newQuantity,
        ]);

        $profile->update([
            'wallet' => $profile->wallet + $request->input('quantity') * $openPrice,
        ]);
    }

    public function sellAll(Request $request, $openPrice, $existingOpenTrade, $profile): void
    {
        $existingOpenTrade->update([
            'close_price' => $request->input('open_price'),
            'close_datetime' => now(),
            'open' => false,
        ]);

        $profile->update([
            'wallet' => $profile->wallet + $request->input('quantity') * $openPrice,
        ]);
    }
}
