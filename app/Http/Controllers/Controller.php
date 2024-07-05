<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;
}

class PriceController extends Controller
{
    public function getCurrentPrices()
    {
        // Votre logique pour obtenir les prix actuels
        return response()->json(['AAPL' => [['c' => 150.00]], 'MSFT' => [['c' => 300.00]]]); // Exemple de réponse
    }
}
