<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

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
        $closePrice = $request->input('price');

        $rules = [
            'quantity' => 'required|numeric|min:0.000000001',
            'price' => 'required|numeric',
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $existingOpenTrade = Trade::getOpenTrades($profile->id, $symbol);

        if ($existingOpenTrade->count() == 0) {
            if ($request->input('quantity') * $closePrice > $profile->wallet) {
                return redirect()->back()->with('error', 'Insufficient funds');
            }

            $this->tradeBuySell->create($request, $closePrice, $profile, $symbol);
        } else {
            if (($request->input('quantity') * $closePrice) > ($profile->wallet)) {
                return redirect()->back()->with('error', 'Insufficient funds');
            }

            $this->tradeBuySell->add($request, $closePrice, $existingOpenTrade, $profile);
        }

        return redirect()->back()->with('success', 'Trade created successfully');
    }

    public function sellSomeOrSellAll(Request $request, $symbol): RedirectResponse
    {
        $user = Auth::user();
        $profile = $user->profile;
        $existingOpenTrade = Trade::getOpenTrades($profile->id, $symbol);
        $closePrice = $this->apiFetch->getSpecificClosePrice($symbol);

        $rules = [
            'quantity' => 'required|numeric|min:0.000000001',
            'open_price' => 'required|numeric',
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        if ($request->input('quantity') > $existingOpenTrade->quantity) {
            return redirect()->back()->with('error', 'You cannot sell more than you have');
        }

        if ($request->input('quantity') == $existingOpenTrade->quantity) {
            $this->tradeBuySell->sellAll($request, $closePrice, $existingOpenTrade, $profile);
        } else {
            $this->tradeBuySell->sellSome($request, $closePrice, $existingOpenTrade, $profile);
        }

        return redirect()->back()->with('success', 'Trade sold successfully');
    }
}
