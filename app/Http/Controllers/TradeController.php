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

    public function show($symbol): Response
    {
        return Inertia::render('Trade/Trade', [
            'symbol' => $symbol
        ]);
    }

    public function createOrAdd(Request $request, $symbol): RedirectResponse
    {
        $user = Auth::user();
        $profile = $user->profile;
        $openPrice = $this->apiFetch->getHistoricalbarsBySymbol($symbol);

        $rules = [
            'quantity' => 'required|numeric|min:0.000000001',
            'open_price' => 'required|numeric',
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $existingOpenTrade = Trade::getOpenWires($profile->id, $symbol);

        if ($existingOpenTrade->count() == 0) {
            if ($request->input('quantity') * $openPrice > $profile->wallet) {
                return redirect()->back()->with('error', 'Insufficient funds');
            }

            $this->tradeBuySell->create($request, $openPrice, $profile, $symbol);
        } else {
            if (($request->input('quantity') * $openPrice) > ($profile->wallet)) {
                return redirect()->back()->with('error', 'Insufficient funds');
            }

            $this->tradeBuySell->add($request, $openPrice, $existingOpenTrade, $profile);
        }

        return redirect()->back()->with('success', 'Trade created successfully');
    }

    public function sellSomeOrSellAll(Request $request, $symbol): RedirectResponse
    {
        $user = Auth::user();
        $profile = $user->profile;
        $existingOpenTrade = Trade::getOpenWires($profile->id, $symbol);
        $openPrice = $this->apiFetch->getHistoricalbarsBySymbol($symbol);

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
            $this->tradeBuySell->sellAll($request, $openPrice, $existingOpenTrade, $profile);
        } else {
            $this->tradeBuySell->sellSome($request, $openPrice, $existingOpenTrade, $profile);
        }

        return redirect()->back()->with('success', 'Trade sold successfully');
    }
}
