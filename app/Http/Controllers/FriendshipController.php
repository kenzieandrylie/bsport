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
    public function index_profile(Request $request){

        // dd($request->id);

        $user = DB::table('users')
                    ->where('username','=',$request->username)
                    ->first(); //return object

        $follower = DB::table('friendships')
                    ->join('users', 'users.id', '=', 'friendships.follower_id')
                    ->where('following_id','=',$user->id)
                    ->get();

        $following = DB::table('friendships')
                    ->join('users', 'users.id', '=', 'friendships.following_id')
                    ->where('follower_id','=',$user->id)
                    ->get();

        $friend = DB::select(
                    "
                    select distinct u.*

                    from
                    (select
                        following_id
                    from friendships
                    where follower_id = $user->id or following_id = $user->id) as following

                    JOIN

                    (select
                    follower_id
                    from friendships
                    where follower_id = $user->id or following_id = $user->id) as follower

                    ON following.following_id = follower.follower_id

                    JOIN

                    users u ON u.id = following_id

                    where following_id <> $user->id
                    "
                );

        $alluser = User::all();

        return Inertia::render('Profile',[
            'users' => $alluser,
            'user' => $user,
            'follower' => $follower,
            'following' => $following,
            'friend' => $friend
        ]);
    }

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
