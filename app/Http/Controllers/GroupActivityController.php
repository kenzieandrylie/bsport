<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Group;
use App\Models\GroupActivity;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class GroupActivityController extends Controller
{
    //
    public function index_group_detail(Request $request){

        $group = Group::where('pin','=',$request->pin)->first();

        if(!$group){
            abort(404);
        }

        $mymemberid = DB::table('group_members')
                    ->where('group_members.group_id','=',$group->id)
                    ->where('group_members.user_id','=',auth()->user()->id)
                    ->pluck('group_members.id')
                    ->first();

        if(!$mymemberid) {
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

        $likes = DB::table('likes')
                ->join('group_activities','group_activities.id','=','likes.group_activity_id')
                ->join('group_members','group_members.id','group_activities.group_member_id')
                ->join('users','users.id','likes.user_id')
                ->where('group_members.group_id','=',$group->id)
                ->selectRaw('likes.id, likes.user_id, likes.group_activity_id,users.*')
                ->get();

        $mysum = DB::table('group_members')
        ->join('group_activities','group_members.id','=','group_activities.group_member_id')
        ->where('group_members.group_id','=',$group->id)
        ->where('group_members.user_id','=',auth()->user()->id)
        ->selectRaw('ifnull(sum(step),0) as sumstep,
                    ifnull(sum(calories),0) as sumcalories,
                    ifnull(sum(time),0) as sumtime,
                    ifnull(sum(distance),0) as sumdistance')
        ->first();

        $standing = DB::table('group_members')
                    ->join('users','users.id','=','group_members.user_id')
                    ->leftjoin('group_activities','group_activities.group_member_id','=','group_members.id')
                    ->where('group_members.group_id','=',$group->id)
                    ->selectRaw('
                                users.username,
                                ifnull(sum(calories),0) as calories')
                    ->groupBy('users.name','users.last_name','users.username','users.profile_picture')
                    ->orderByDesc('calories')
                    ->take(3)
                    ->get();

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
            'sum' => $mysum,
            'topthree' => $standing,
            'likes' => $likes
        ]);
    }

    public function create_post(Request $request){

        $request->validate([
            'group_member_id' => 'required|integer',
            'activity_id' => 'required|integer'
        ]);

        $groupactivity = new GroupActivity();

        if($request->activity_id == 1){
            $request->validate([
                'step' => 'required|integer',
                'distance' => 'required|integer',
                'calories' => 'required|integer',
                'caption' => 'string|nullable',
                'activity_date' => 'required|date|before:tomorrow',
                'activity_picture' => 'required|mimes:jpg,bmp,png|max:1024'
            ]);

            $groupactivity->distance = $request->distance;
            $groupactivity->step = $request->step;
        }
        else if($request->activity_id == 2){
            $request->validate([
                'distance' => 'required|integer',
                'calories' => 'required|integer',
                'caption' => 'string|nullable',
                'activity_date' => 'required|date|before:tomorrow',
                'activity_picture' => 'required|mimes:jpg,bmp,png|max:1024'
            ]);

            $groupactivity->distance = $request->distance;
        }
        else if($request->activity_id == 3){
            $request->validate([
                'time' => 'required|integer',
                'calories' => 'required|integer',
                'caption' => 'string|nullable',
                'activity_date' => 'required|date|before:tomorrow',
                'activity_picture' => 'required|mimes:jpg,bmp,png|max:1024'
            ]);

            $groupactivity->time = $request->time;
        }

        if($request->file('activity_picture')){
            $imageName = time().'.'.$request->file('activity_picture')->getClientOriginalExtension();

            Storage::putFileAs('public/image-postactivity',$request->file('activity_picture'),$imageName);
        }

        $groupactivity->group_member_id = $request->group_member_id;
        $groupactivity->activity_id = $request->activity_id;
        $groupactivity->activity_picture = 'image-postactivity/'.$imageName;
        $groupactivity->activity_date = $request->activity_date;
        $groupactivity->calories = $request->calories;
        $groupactivity->caption = $request->caption;

        $groupactivity->save();

        return redirect()->back()->with("message","post success");
    }

    public function index_leaderboard(Request $request){

        $group = Group::where('pin','=',$request->pin)->first();
        if(!$group){
            abort(404);
        }

        if(!$request->sortby){
            $p_sort = 'calories';
        }
        else{
            $p_sort = $request->sortby;
        }

        if(!$request->filterby || $request->filterby == 0){
            $p_filter = 0;

            $subq = DB::table('group_activities')
                ->selectRaw('id,group_member_id,step,calories,time,distance,month(activity_date) as bulan');
        }
        else{
            $p_filter = $request->filterby;

            $subq = DB::table('group_activities')
                ->selectRaw('id,group_member_id,step,calories,time,distance,month(activity_date) as bulan')
                ->whereMonth('activity_date','like',$p_filter);
        }

        $table_value = DB::table('group_members')
                        ->join('users','users.id','=','group_members.user_id')
                        ->leftJoinSub($subq,'group_activities_filtered', function ($join) {
                            $join->on('group_members.id','=','group_activities_filtered.group_member_id');
                        })
                        ->where('group_members.group_id','=',$group->id)
                        ->selectRaw('users.id as user_id,
                                    users.name,
                                    users.last_name,
                                    users.username,
                                    users.profile_picture,
                                    ifnull(sum(step),0) as step,
                                    ifnull(sum(calories),0) as calories,
                                    ifnull(sum(time),0) as duration,
                                    ifnull(sum(distance),0) as distance')
                        ->groupBy('users.id','users.name','users.last_name','users.username','users.profile_picture')
                        ->orderByDesc($p_sort)
                        ->get();

        $alluser = User::all();
        $time_from = Carbon::now()->subDays(1);
        $notification = DB::table('users')
                        ->join('friendships', 'users.id', '=', 'friendships.follower_id')
                        ->where('following_id','=',auth()->user()->id)
                        ->where('friendships.created_at','>=',$time_from)
                        ->get();

        return Inertia::render('Leaderboard',[
            'users' => $alluser,
            'notifications' => $notification,
            'group' => $group,
            'values' => $table_value,
            'p_sort' => $p_sort,
            'p_filter' => $p_filter
        ]);
    }
}
