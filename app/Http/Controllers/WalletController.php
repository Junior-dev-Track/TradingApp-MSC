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
        return Inertia::render('wallet/wallet', ['wallet' => Profile::getWallet($user_id), 'recentWires' => Wire::getRecentWires($user_id)]);
    }

    public function createDepositForm(): Response
    {
        return Inertia::render('wallet/deposit');
    }

    public function createWithdrawForm()
    {

        return Inertia::render('wallet/withdraw');
    }
}
