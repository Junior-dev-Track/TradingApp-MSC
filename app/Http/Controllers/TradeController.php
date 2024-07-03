<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

use Illuminate\Support\Facades\Auth;

use App\Models\Trade;

use App\Services\APIFetch;
use App\Services\TradeBuySell;

use Inertia\Inertia;
use Inertia\Response;

class TradeController extends Controller
{
    protected $apiFetch;
    protected $tradeBuySell;

    public function __construct(APIFetch $apiFetch, TradeBuySell $tradeBuySell)
    {
        $this->apiFetch = $apiFetch;
        $this->tradeBuySell = $tradeBuySell;
    }

    public function showBuy($symbol): Response
    {

        return Inertia::render('Trade/Buy', [
            'symbol' => $symbol
        ]);
    }

    public function showSell($symbol): Response
    {
        return Inertia::render('Trade/Sell', [
            'symbol' => $symbol
        ]);
    }

    public function createOrAdd(Request $request, $symbol): RedirectResponse
    {
        $user = Auth::user();
        $profile = $user->profile;
        $closePrice = $this->apiFetch->getSpecificClosePrice($symbol);

        $existingOpenTrade = Trade::getOpenTradeBySymbol($profile->id, $symbol);

        $totalPrice = $request->input('quantity') * $closePrice;

        if ($totalPrice > $profile->wallet) {
            return redirect()->back()->with('error', 'Insufficient funds');
        }

        if (empty($existingOpenTrade)) {
            $this->tradeBuySell->create($request, $closePrice, $profile, $symbol);
        } else {
            $this->tradeBuySell->add($request, $closePrice, $existingOpenTrade, $profile);
        }

        return redirect()->back()->with('success', 'Trade created successfully');
    }

    public function sellSomeOrSellAll(Request $request, $symbol): RedirectResponse
    {
        $user = Auth::user();
        $profile = $user->profile;
        $existingOpenTrade = Trade::getOpenTradeBySymbol($profile->id, $symbol);
        $closePrice = $this->apiFetch->getSpecificClosePrice($symbol);


        $quantity = $request->input('quantity');
        $existingQuantity = $existingOpenTrade->quantity;

        if ($quantity > $existingQuantity) {
            return redirect()->back()->with('error', 'You cannot sell more than you have');
        }

        if ($quantity === $existingQuantity) {
            $this->tradeBuySell->sellAll($request, $closePrice, $existingOpenTrade, $profile);
        } else {
            $this->tradeBuySell->sellSome($request, $closePrice, $existingOpenTrade, $profile);
        }

        return redirect()->back()->with('success', 'Trade sold successfully');
    }
}
