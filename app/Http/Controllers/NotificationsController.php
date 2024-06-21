<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class NotificationsController extends Controller
{
    public function index(Request $request)
    {
        $notifications = $request->input('notifications', []);

        return Inertia::render('Auth/Notifications', [
            'notifications' => $notifications,
        ]);
    }
}
