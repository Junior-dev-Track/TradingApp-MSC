<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Inertia\Inertia;

class TradeController extends Controller
{
    public function show($symbol)
    {
        return Inertia::render('/Trade/Trade', ['symbol' => $symbol]);
    }
}
