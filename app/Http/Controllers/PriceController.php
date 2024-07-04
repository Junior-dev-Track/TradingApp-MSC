<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PriceController extends Controller
{
    public function getCurrentPrices()
    {
        // Remplacez par votre logique réelle pour obtenir les prix actuels
        return response()->json([
            'AAPL' => [['c' => 150.00]],
            'MSFT' => [['c' => 300.00]],
        ]);
    }
}
