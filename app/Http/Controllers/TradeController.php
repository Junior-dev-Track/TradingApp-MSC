<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

use App\Models\Trade;

use Inertia\Inertia;
use Inertia\Response;

class TradeController extends Controller
{
    public function show($symbol): Response
    {
        return Inertia::render('Trade/Trade', [
            'symbol' => $symbol
        ]);
    }
    public function createOrAdd(Request $request, $symbol): ?RedirectResponse
    {
        $user = Auth::user();
        $profile = $user->profile;
        $profileId = $profile->id;

        $rules = [
            'quantity' => 'required|numeric|min:0.000000001',
            'open_price' => 'required|numeric',
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

        $existingOpenTrade = Trade::getOpenWires($profileId, $symbol);

        if ($existingOpenTrade->count() == 0) {
            if ($request->input('quantity') * $request->input('open_price') <= $profile->wallet) {
                $this->store($request, $profile, $symbol);
            } else {
                return redirect()->back()->with('error', 'Insufficient funds');
            }
        } else {
            if ($request->input('quantity') * $request->input('open_price') <= $profile->wallet) {
                $this->add($request, $existingOpenTrade, $profile);
            } else {
                return redirect()->back()->with('error', 'Insufficient funds');
            }
        }
    }

    public function sellSomeOrSellAll(Request $request, $symbol): ?RedirectResponse
    {
        $user = Auth::user();
        $profile = $user->profile;
        $profileId = $profile->id;

        $rules = [
            'quantity' => 'required|numeric|min:0.000000001',
            'open_price' => 'required|numeric',
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

        $existingOpenTrade = Trade::getOpenWires($profileId, $symbol);

        if ($request->quantity > $existingOpenTrade->quantity) {
            return redirect()->back()->with('error', 'You cannot sell more than you have');
        } elseif ($request->quantity == $existingOpenTrade->quantity) {
            $this->sellAll($request, $existingOpenTrade, $profile);
        } else {
            $this->sellSome($request, $existingOpenTrade, $profile);
        }
    }

    public function create(Request $request, $profile, $symbol): RedirectResponse
    {


        Trade::create([
            'profile_id' => $profile->id,
            'symbol' => $symbol,
            'quantity' => $request->input('quantity'),
            'open_price' => $request->input('open_price'),
        ]);

        $newTotal = $profile->wallet - $request->input('quantity') * $request->input('open_price');

        $profile->update([
            'wallet' => $newTotal,
        ]);

        return redirect()->back()->with('success', 'Trade created successfully');
    }

    public function add(Request $request, $existingOpenTrade, $profile): RedirectResponse
    {
        $newQuantity = $existingOpenTrade->quantity + $request->input('quantity');

        $existingOpenTrade->update(['quantity' => $newQuantity]);

        $newTotal = $profile->wallet - $request->input('quantity') * $request->input('open_price');

        $profile->update([
            'wallet' => $newTotal,
        ]);

        return redirect()->back()->with('success', 'Trade added successfully');
    }

    public function sellAll(Request $request, $existingOpenTrade, $profile): RedirectResponse
    {
        $existingOpenTrade->update([
            'close_price' => $request->input('open_price'),
            'close_datetime' => now(),
            'open' => false,
        ]);

        $newTotal = $profile->wallet + $request->input('quantity') * $request->input('open_price');

        $profile->update([
            'wallet' => $newTotal,
        ]);

        return redirect()->back()->with('success', 'Trade sold successfully');
    }

    public function sellSome(Request $request, $existingOpenTrade, $profile): RedirectResponse
    {
        $newQuantity = $existingOpenTrade->quantity - $request->input('quantity');

        $existingOpenTrade->update([
            'quantity' => $newQuantity,
        ]);

        $newTotal = $profile->wallet + $request->input('quantity') * $request->input('open_price');

        $profile->update([
            'wallet' => $newTotal,
        ]);

        return redirect()->back()->with('success', 'Trade sold successfully');
    }
}
