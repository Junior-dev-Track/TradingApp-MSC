<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;
use App\Models\Profile;
use App\Models\Wire;


class WalletController extends Controller
{

    public function index(): Response
    {
        $user_id = Auth::id();
        return Inertia::render('Wallet/Wallet', ['wallet' => Profile::getWallet($user_id), 'recentWires' => Wire::getRecentWires($user_id)]);
    }

    public function createDepositForm(): Response
    {
        return Inertia::render('Wallet/Deposit');
    }

    public function createWithdrawForm(): Response
    {

        return Inertia::render('Wallet/Withdraw');
    }
}
