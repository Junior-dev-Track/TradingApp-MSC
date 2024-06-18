<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\Trade;
use Illuminate\Http\RedirectResponse;

class TradeController extends Controller
{
    public function store(Request $request, $symbol): RedirectResponse
    {
        $rules = [
            'quantity' => 'required|numeric|min:0.000000001',
            'open_price' => 'required|numeric',
            'open_datetime' => 'required|date',
            'open' => 'required|boolean',
        ];

        $customMessages = [
            'quantity.min' => 'The quantity must be at least :min.',
        ];

        $request->validate($rules, $customMessages);

        $symbolRules = [
            'symbol' => 'required|string|max:10',
        ];

        $symbolData = ['symbol' => $symbol];
        Validator::make($symbolData, $symbolRules)->validate();

        $user = Auth::user();
        $profile = $user->profile;
        $profile_id = $profile->id;

        Trade::create([
            'profile_id' => $profile_id,
            'symbol' => $symbol,
            'quantity' => $request->input('quantity'),
            'open_price' => $openPrice,
            'open_datetime' => $openDatetime,
            'open' => true
        ]);


        return redirect()->back()->with('success', 'Trade created successfully');
    }

    public function update(Request $request): RedirectResponse
    {
        $rules = ['close_price' => 'nullable|numeric', 'close_datetime' => 'nullable|date',];
        $request->validate($rules);
    }
}
