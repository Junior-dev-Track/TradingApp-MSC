<?php

use App\Services\APIFetch;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TradeController;
use App\Http\Controllers\WalletController;
use App\Http\Controllers\WireController;
use App\Http\Controllers\NotificationsController;
use App\Http\Controllers\GuideController;
use App\Http\Controllers\PriceController;


use Illuminate\Support\Facades\Route;

use Inertia\Inertia;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome');
});

Route::get('/api/current-prices', [PriceController::class, 'getCurrentPrices']);


Route::get('/current-prices', function (APIFetch $apiFetch) {
    return $apiFetch->getLastestBars();
});

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/notifications', [NotificationsController::class, 'index'])->name('notifications');



    Route::get('/wires', [WireController::class, 'index'])->name('wires');
    Route::post('/wires/deposit', [WireController::class, 'storeDeposit'])->name('wallet.storeDeposit');
    Route::post('/wires/withdraw', [WireController::class, 'storeWithdrawal'])->name('wallet.storeWithdrawal');


    Route::get('/trade/{symbol}/buy', [TradeController::class, 'show'])->name('trade.showBuy');
    Route::get('/trade/{symbol}/sell', [TradeController::class, 'show'])->name('trade.showSell');
    Route::post('/trade/{symbol}/buy', [TradeController::class, 'createOrAdd'])->name('trade.buy');
    Route::post('/trade/{symbol}/sell', [TradeController::class, 'sellSomeOrSellAll'])->name('trade.sell');



    Route::get('/guide', [GuideController::class, 'index'])->name('guide');
});


require __DIR__ . '/auth.php';
