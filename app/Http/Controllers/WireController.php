<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use App\Models\Wire;
use App\Models\Profile;
use Inertia\Inertia;

class WireController extends Controller
{

    public function index()
    {

        $user = Auth::user();
        $profile = $user->profile;
        $profile_id = $profile->id;
        $wires = Wire::getUserWires($profile_id);
        return Inertia::render('wallet/wires', ['wires' => $wires]);
    }

    public function storeDeposit(Request $request)
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

            return Redirect::route('wallet')->with('status', 'Deposit successful!');
        } else {
            return Redirect::route('wallet')->with('error', 'Profile not found.');
        }
    }

    public function storeWithdrawal(Request $request)
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

            return Redirect::route('wallet')->with('status', 'Withdrawal successful!');
        } else {
            return Redirect::route('wallet')->with('error', 'Insufficient balance or profile not found.');
        }
    }
}
