<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use App\Models\Wire;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class WireController extends Controller
{

    public function index(): Response
    {

        $user = Auth::user();
        $profile = $user->profile;
        $profile_id = $profile->id;
        $wallet = (float) $profile->wallet;
        $wires = Wire::getUserWires($profile_id);
        $recentWires = Wire::getRecentWires($profile_id);


        return Inertia::render('Wires/Wires', ['wires' => $wires, 'wallet' => $wallet, 'recentWires' => $recentWires]);
    }

    public function storeDeposit(Request $request): RedirectResponse
    {
        $request->validate([
            'amount' => 'required|numeric|min:0'
        ]);

        $depositAmount = $request->amount;
        $user = Auth::user();
        $profile = $user->profile;

        if ($profile) {

            $profile->wallet += $depositAmount;
            $profile->save();


            Wire::create([
                'profile_id' => $profile->id,
                'amount' => $depositAmount,
                'withdrawal' => false
            ]);

            return Redirect::route('wires')->with('status', 'Deposit successful!');
        } else {
            return Redirect::route('wires')->with('error', 'Profile not found.');
        }
    }

    public function storeWithdrawal(Request $request): RedirectResponse
    {
        $request->validate([
            'amount' => 'required|numeric|min:0'
        ]);

        $withdrawalAmount = $request->amount;
        $user = Auth::user();
        $profile = $user->profile;

        if ($profile && $profile->wallet >= $withdrawalAmount) {

            $profile->wallet -= $withdrawalAmount;
            $profile->save();

            Wire::create([
                'profile_id' => $profile->id,
                'amount' => $withdrawalAmount,
                'withdrawal' => true
            ]);

            return Redirect::route('wires')->with('status', 'Withdrawal successful!');
        } else {
            return Redirect::route('wires')->with('error', 'Insufficient balance or profile not found.');
        }
    }
}
