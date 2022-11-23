<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FriendshipController extends Controller
{
    //
    public function index_profile(){

        $alluser = User::all();

        return Inertia::render('Profile',[
            'users' => $alluser
        ]);
    }
}
