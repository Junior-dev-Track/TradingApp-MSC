<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;
use App\Models\Profile;


class WalletController extends Controller
{

    public function index(): Response
    {
        return Inertia::render('wallet/wallet', ['wallet' => Profile::getWallet(Auth::id())]);
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