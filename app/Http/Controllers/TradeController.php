<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

use App\Models\Trade;

class TradeController extends Controller
{

    public function show($symbol)
    {
        return Inertia::render('Trade/Trade', ['symbol' => $symbol]);
    }

    public function store(Request $request): RedirectResponse
    {
        $rules = [
            'profile_id' => 'required|exists:profiles,id',
            'symbol' => 'required|string|max:10',
            'quantity' => 'required|integer|min:0.000000001',
            'open_price' => 'required|numeric',
            'close_price' => 'nullable|numeric',
            'open_datetime' => 'required|date',
            'close_datetime' => 'nullable|date',
            'open' => 'required|boolean',
        ];

        $customMessages = [
            'profile_id.exists' => 'The selected profile is invalid.',
            'quantity.min' => 'The quantity must be at least :min.',
        ];


        $validated = $request->validate($rules, $customMessages);

        Trade::create($validated);

        return redirect()->back()->with('success', 'Trade created successfully');
    }
}
