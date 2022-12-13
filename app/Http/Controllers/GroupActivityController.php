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

        $posts = DB::table('users')
                ->join('group_members','group_members.user_id','=','users.id')
                ->join('group_activities','group_members.id','=','group_activities.group_member_id')
                ->join('groups','group_members.group_id','=','groups.id')
                ->where('group_members.group_id','=',$group->id)
                ->selectRaw('group_activities.*,users.username,users.profile_picture,groups.name as group_name,users.id as user_id')
                ->orderByDesc('group_activities.created_at')
                ->get();

        $sum = DB::table('group_members')
        ->join('group_activities','group_members.id','=','group_activities.group_member_id')
        ->where('group_members.group_id','=',$group->id)
        ->where('group_members.user_id','=',auth()->user()->id)
        ->selectRaw('sum(step) as sumstep, sum(calories) as sumcalories, sum(time) as sumtime, sum(distance) as sumdistance')
        ->first();

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
            'mymemberid' => $mymemberid,
            'posts' => $posts,
            'sum' => $sum
        ]);
    }
}
