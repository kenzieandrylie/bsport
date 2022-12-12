<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Group;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class GroupActivityController extends Controller
{
    //
    public function index_group_detail(Request $request){

        $group = Group::where('pin','=',$request->pin)->first();

        $mymemberid = DB::table('group_members')
                    ->where('group_members.group_id','=',$group->id)
                    ->where('group_members.user_id','=',auth()->user()->id)
                    ->pluck('group_members.id')
                    ->first();

        if( !$group || !$mymemberid) {
            abort(404);
        }

        $alluser = User::all();

        $activities = Activity::all();

        $time_from = Carbon::now()->subDays(1);
        $notification = DB::table('users')
                        ->join('friendships', 'users.id', '=', 'friendships.follower_id')
                        ->where('following_id','=',auth()->user()->id)
                        ->where('friendships.created_at','>=',$time_from)
                        ->get();

        $member = DB::table('group_members')
                ->join('users','users.id','=','group_members.user_id')
                ->where('group_members.group_id','=',$group->id)
                ->get();

        return Inertia::render('GroupDetail',[
            'users' => $alluser,
            'notifications' => $notification,
            'activities' => $activities,
            'group' => $group,
            'members' => $member,
            'mymemberid' => $mymemberid
        ]);
    }
}
