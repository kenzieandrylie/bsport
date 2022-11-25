<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class FriendshipController extends Controller
{
    //
    public function index_profile(Request $request){

        // dd($request->id);

        $user = DB::table('users')
                    ->where('username','=',$request->username)
                    ->first();

        $follower = DB::table('friendships')
                    ->where('following_id','=',$user->id)
                    ->get();

        $following = DB::table('friendships')
                    ->where('follower_id','=',$user->id)
                    ->get();

        $alluser = User::all();

        return Inertia::render('Profile',[
            'users' => $alluser,
            'user' => $user,
            'follower' => $follower,
            'following' => $following
        ]);
    }
}
