<?php

namespace App\Http\Controllers;

use App\Models\GroupActivity;
use Illuminate\Http\Request;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ProfileController extends Controller
{
    //index profile
    public function index_profile(Request $request){

        // dd($request->id);

        $user = DB::table('users')
                    ->where('username','=',$request->username)
                    ->first(); //return object

        if(!$user) {abort(404);}

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

        $posts = DB::table('users')
                ->join('group_members','group_members.user_id','=','users.id')
                ->join('group_activities','group_members.id','=','group_activities.group_member_id')
                ->join('groups','group_members.group_id','=','groups.id')
                ->where('group_members.user_id','=',$user->id)
                ->selectRaw('group_activities.*,users.username,users.profile_picture,groups.name as group_name')
                ->orderByDesc('group_activities.created_at')
                ->get();

        $likes = DB::table('likes')
        ->join('group_activities','group_activities.id','=','likes.group_activity_id')
        ->join('group_members','group_members.id','group_activities.group_member_id')
        ->join('users','users.id','likes.user_id')
        ->where('group_members.user_id','=',$user->id)
        ->selectRaw('likes.id, likes.user_id, likes.group_activity_id, users.*')
        ->get();

        $sum = DB::table('group_members')
                ->join('group_activities','group_members.id','=','group_activities.group_member_id')
                ->where('group_members.user_id','=',$user->id)
                ->selectRaw('sum(step) as sumstep, sum(calories) as sumcalories, sum(time) as sumtime, sum(distance) as sumdistance')
                ->first();

        $time_from = Carbon::now()->subDays(1);
        $notification = DB::table('users')
                        ->join('friendships', 'users.id', '=', 'friendships.follower_id')
                        ->where('following_id','=',auth()->user()->id)
                        ->where('friendships.created_at','>=',$time_from)
                        ->get();

        $alluser = User::all();

        return Inertia::render('Profile',[
            'users' => $alluser,
            'user' => $user,
            'follower' => $follower,
            'following' => $following,
            'friend' => $friend,
            'notifications' => $notification,
            'posts' => $posts,
            'sum' => $sum,
            'likes' => $likes
        ]);
    }

    //edit profile
    public function index_edit_profile() {

        $alluser = User::all();

        $time_from = Carbon::now()->subDays(1);
        $notification = DB::table('users')
                        ->join('friendships', 'users.id', '=', 'friendships.follower_id')
                        ->where('following_id','=',auth()->user()->id)
                        ->where('friendships.created_at','>=',$time_from)
                        ->get();

        return Inertia::render('EditProfile',[
            'users' => $alluser,
            'notifications' => $notification
        ]);
    }

    public function edit_profile(Request $request) {

        $request->validate([
            'name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'username' => ['required','string','max:20',Rule::unique('users')->ignore(auth()->user()->id, 'id')],
            'email' => ['required','string','max:255','email',Rule::unique('users')->ignore(auth()->user()->id, 'id')],
            'profile_picture' => ['nullable'],
            'cover_picture' => ['nullable']
        ]);

        if($request->file('profile_picture')) {

            $request->validate([
                'profile_picture' => ['mimes:jpg,bmp,png','max:1024']
            ]);

            $imageName = time().'.'.$request->file('profile_picture')->getClientOriginalExtension();

            if(auth()->user()->profile_picture){
                Storage::delete('public/'. auth()->user()->profile_picture);
            }

            Storage::putFileAs('public/image-profile',$request->file('profile_picture'),$imageName);

            User::whereId(auth()->user()->id)->update([
                'profile_picture' => 'image-profile/'.$imageName
            ]);
        }

        if($request->file('cover_picture')) {

            $request->validate([
                'cover_picture' => ['mimes:jpg,bmp,png','max:1024']
            ]);

            $imageName = time().'.'.$request->file('cover_picture')->getClientOriginalExtension();

            if(auth()->user()->cover_picture){
                Storage::delete('public/'. auth()->user()->cover_picture);
            }

            Storage::putFileAs('public/image-cover',$request->file('cover_picture'),$imageName);

            User::whereId(auth()->user()->id)->update([
                'cover_picture' => 'image-cover/'.$imageName
            ]);
        }

        User::whereId(auth()->user()->id)->update([
            'name' => $request->name,
            'last_name' => $request->last_name,
            'username' => $request->username,
            'email' => $request->email
        ]);

        return redirect()->back()->with("message","Profile Updated.");
    }


    //edit password
    public function edit_password(Request $request){

        $request->validate([
            'current_password' => 'required|current_password',
            'password' => 'required|confirmed',
        ]);

        User::whereId(auth()->user()->id)->update([
            'password' => Hash::make($request->password)
        ]);

        return redirect()->back()->with("message","Password Updated!");
    }

    //ADMIN
    //ban user
    public function ban_user(Request $request){
        User::find($request->id)->update([
            'is_banned' => true
        ]);
        return redirect()->back();
    }
    //unban
    public function unban_user(Request $request){
        User::find($request->id)->update([
            'is_banned' => false
        ]);
        return redirect()->back();
    }
    //role
    public function change_role(Request $request){
        if($request->role == 'admin'){
            User::find($request->id)->update([
                'is_admin' => true
            ]);
        }
        else if($request->role == 'user'){
            User::find($request->id)->update([
                'is_admin' => false
            ]);
        }
        return redirect()->back();
    }
}
