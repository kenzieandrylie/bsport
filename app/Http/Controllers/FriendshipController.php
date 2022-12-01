<?php

namespace App\Http\Controllers;

use App\Models\Friendship;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class FriendshipController extends Controller
{
    //

    //follow
    public function follow(Request $request) {

        $auth_id = auth()->user()->id;

        $friendship = new Friendship();
        $friendship->following_id = $request->id;
        $friendship->follower_id = $auth_id;
        $friendship->save();

        return redirect()->back();
    }

    //unfollow
    public function unfollow(Request $request) {

        $auth_id = auth()->user()->id;

        Friendship::where('follower_id','=',$auth_id)
        ->where('following_id','=',$request->id)
        ->delete();

        return redirect()->back();
    }
}
