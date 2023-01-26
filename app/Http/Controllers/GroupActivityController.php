<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Group;
use App\Models\GroupActivity;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
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

        $comments = DB::table('comments')
        ->join('group_activities','group_activities.id','=','comments.group_activity_id')
        ->join('group_members','group_members.id','group_activities.group_member_id')
        ->join('users','users.id','comments.user_id')
        ->where('group_members.group_id','=',$group->id)
        ->selectRaw('comments.id, comments.user_id, comments.group_activity_id, comments.body, comments.created_at, users.username, users.profile_picture')
        ->orderBy('comments.created_at')
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

        $auth_id = auth()->user()->id;
        $notification = DB::select(
                        "
                            SELECT
                                u.username,
                                u.profile_picture,
                                'follow' as type,
                                '' as group_name,
                                '' as activity_picture,
                                f.created_at
                            FROM users u
                            JOIN friendships f on f.follower_id = u.id
                            WHERE f.following_id = $auth_id
                            AND f.created_at >= NOW() - INTERVAL 1 DAY

                            UNION ALL

                            SELECT
                                u.username,
                                u.profile_picture,
                                'post' as type,
                                mygroup.name as group_name,
                                activity_picture,
                                ga.created_at
                                FROM group_activities ga
                            JOIN group_members gm on ga.group_member_id = gm.id
                            JOIN (
                                SELECT
                                    g.id,
                                    g.name
                                FROM group_members gm
                                join groups g on g.id = gm.group_id
                                WHERE gm.user_id = $auth_id
                            ) as mygroup on mygroup.id = gm.group_id
                            JOIN users u on u.id = gm.user_id
                            WHERE ga.created_at >= NOW() - INTERVAL 1 DAY

                            UNION ALL

                            SELECT
                                u.username,
                                u.profile_picture,
                                'like' as type,
                                '' as group_name,
                                ga.activity_picture,
                                l.created_at
                            FROM likes l
                            JOIN group_activities ga on ga.id = l.group_activity_id
                            JOIN users u on u.id = l.user_id
                            JOIN group_members gm on gm.id = ga.group_member_id
                            WHERE gm.user_id = $auth_id AND l.user_id <> $auth_id
                            AND l.created_at >= NOW() - INTERVAL 1 DAY

                            UNION ALL

                            SELECT
                                u.username,
                                u.profile_picture,
                                'comment' as type,
                                '' as group_name,
                                ga.activity_picture,
                                c.created_at
                            FROM comments c
                            JOIN group_activities ga on ga.id = c.group_activity_id
                            JOIN users u on u.id = c.user_id
                            JOIN group_members gm on gm.id = ga.group_member_id
                            WHERE gm.user_id = $auth_id AND c.user_id <> 1
                            AND c.created_at >= NOW() - INTERVAL 1 DAY

                            order by created_at desc
                        ");

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
            'likes' => $likes,
            'comments' => $comments
        ]);
    }

    public function create_post(Request $request){

        if($request->group_member_id==null && $request->group_id!=null){

            $data = DB::table('group_members')->where('group_id','=',$request->group_id)
            ->where('user_id','=',auth()->user()->id)->first();

            $request->group_member_id =$data->id;
            $request->validate([
                'activity_id' => 'required|integer'
            ]);
        }else{
            $request->validate([
                'group_member_id' => 'required|integer',
                'activity_id' => 'required|integer'
            ]);
        }



        $groupactivity = new GroupActivity();

        if(gettype($request->activity_picture)=="string"){

            if($request->activity_id == 1){
                $request->validate([
                    'step' => 'required|integer',
                    'distance' => 'required|integer',
                    'calories' => 'required|integer',
                    'caption' => 'string|nullable',
                    'activity_date' => 'required|date|before:tomorrow',
                    'activity_picture' => 'required'
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
                    'activity_picture' => 'required'
                ]);

                $groupactivity->distance = $request->distance;
            }
            else if($request->activity_id == 3){
                $request->validate([
                    'time' => 'required|integer',
                    'calories' => 'required|integer',
                    'caption' => 'string|nullable',
                    'activity_date' => 'required|date|before:tomorrow',
                    'activity_picture' => 'required'
                ]);

                $groupactivity->time = $request->time;
            }

            $url = $request->activity_picture;
            $file = file_get_contents($url);
            $extension = File::extension($url);

            $path = 'public/image-postactivity/'.time().'.'.$extension;
            $imageName = 'image-postactivity/'.time().'.'.$extension;
            if (!Storage::exists('public/image-postactivity')) {
                Storage::makeDirectory('public/image-postactivity');
            }
            Storage::put($path, $file);
            $groupactivity->activity_picture = $imageName;
            //Storage::putFileAs('public/image-postactivity',$request->file('activity_picture'),$imageName);
        }else{

            if($request->activity_id == 1){
                $request->validate([
                    'step' => 'required|integer',
                    'distance' => 'required|integer',
                    'calories' => 'required|integer',
                    'caption' => 'string|nullable',
                    'activity_date' => 'required|date|before:tomorrow',
                    'activity_picture' => 'required|mimes:jpg,bmp,png|max:10240'
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
                    'activity_picture' => 'required|mimes:jpg,bmp,png|max:10240'
                ]);

                $groupactivity->distance = $request->distance;
            }
            else if($request->activity_id == 3){
                $request->validate([
                    'time' => 'required|integer',
                    'calories' => 'required|integer',
                    'caption' => 'string|nullable',
                    'activity_date' => 'required|date|before:tomorrow',
                    'activity_picture' => 'required|mimes:jpg,bmp,png|max:10240'
                ]);

                $groupactivity->time = $request->time;
            }

            if($request->file('activity_picture')){
                $imageName = time().'.'.$request->file('activity_picture')->getClientOriginalExtension();

                Storage::putFileAs('public/image-postactivity',$request->file('activity_picture'),$imageName);
                $groupactivity->activity_picture = 'image-postactivity/'.$imageName;
            }
        }

        $groupactivity->group_member_id = $request->group_member_id;
        $groupactivity->activity_id = $request->activity_id;

        $groupactivity->activity_date = $request->activity_date;
        $groupactivity->calories = $request->calories;
        $groupactivity->caption = $request->caption;

        $groupactivity->save();

        return redirect()->back()->with("message","Post Added.");
    }

    public function delete_post(Request $request){
        $data = GroupActivity::where('id','=',$request->id)->first();

        Storage::delete('public/'.$data->activity_picture);

        $data->delete();

        return redirect()->back()->with("message","Post Deleted.");
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
        $auth_id = auth()->user()->id;
        $notification = DB::select(
                        "
                            SELECT
                                u.username,
                                u.profile_picture,
                                'follow' as type,
                                '' as group_name,
                                '' as activity_picture,
                                f.created_at
                            FROM users u
                            JOIN friendships f on f.follower_id = u.id
                            WHERE f.following_id = $auth_id
                            AND f.created_at >= NOW() - INTERVAL 1 DAY

                            UNION ALL

                            SELECT
                                u.username,
                                u.profile_picture,
                                'post' as type,
                                mygroup.name as group_name,
                                activity_picture,
                                ga.created_at
                                FROM group_activities ga
                            JOIN group_members gm on ga.group_member_id = gm.id
                            JOIN (
                                SELECT
                                    g.id,
                                    g.name
                                FROM group_members gm
                                join groups g on g.id = gm.group_id
                                WHERE gm.user_id = $auth_id
                            ) as mygroup on mygroup.id = gm.group_id
                            JOIN users u on u.id = gm.user_id
                            WHERE ga.created_at >= NOW() - INTERVAL 1 DAY

                            UNION ALL

                            SELECT
                                u.username,
                                u.profile_picture,
                                'like' as type,
                                '' as group_name,
                                ga.activity_picture,
                                l.created_at
                            FROM likes l
                            JOIN group_activities ga on ga.id = l.group_activity_id
                            JOIN users u on u.id = l.user_id
                            JOIN group_members gm on gm.id = ga.group_member_id
                            WHERE gm.user_id = $auth_id AND l.user_id <> $auth_id
                            AND l.created_at >= NOW() - INTERVAL 1 DAY

                            UNION ALL

                            SELECT
                                u.username,
                                u.profile_picture,
                                'comment' as type,
                                '' as group_name,
                                ga.activity_picture,
                                c.created_at
                            FROM comments c
                            JOIN group_activities ga on ga.id = c.group_activity_id
                            JOIN users u on u.id = c.user_id
                            JOIN group_members gm on gm.id = ga.group_member_id
                            WHERE gm.user_id = $auth_id AND c.user_id <> 1
                            AND c.created_at >= NOW() - INTERVAL 1 DAY

                            order by created_at desc
                        ");

        return Inertia::render('Leaderboard',[
            'users' => $alluser,
            'notifications' => $notification,
            'group' => $group,
            'values' => $table_value,
            'p_sort' => $p_sort,
            'p_filter' => $p_filter
        ]);
    }

    public function edit_post(Request $request){



            $data = GroupActivity::where('id','=',$request->id)->first();
            if($request->activity_id == 1){

                $request->validate([
                    'step' => 'required|integer',
                    'distance' => 'required|integer',
                    'calories' => 'required|integer',
                    'caption' => 'string|nullable',
                    'activity_date' => 'required|date|before:tomorrow',

                ]);
                $data->time= 0;
                $data->distance = $request->distance;
                $data->step = $request->step;
            }
            else if($request->activity_id == 2){
                $request->validate([
                    'distance' => 'required|integer',
                    'calories' => 'required|integer',
                    'caption' => 'string|nullable',
                    'activity_date' => 'required|date|before:tomorrow',

                ]);
                $data->step = 0;
                $data->time = 0;
                $data->distance = $request->distance;
            }
            else if($request->activity_id == 3){
                $request->validate([
                    'time' => 'required|integer',
                    'calories' => 'required|integer',
                    'caption' => 'string|nullable',
                    'activity_date' => 'required|date|before:tomorrow',

                ]);

                $data->step = 0;
                $data->distance = 0;
                $data->time = $request->time;
            }
            if($request->file('activity_picture')){
                $request->validate([
                    'activity_picture'=>'mimes:jpg,bmp,png|max:10240'
                ]);
                $imageName = time().'.'.$request->file('activity_picture')->getClientOriginalExtension();
                Storage::putFileAs('public/image-postactivity',$request->file('activity_picture'),$imageName);
                if($data->activity_picture !=null){
                    Storage::delete($data->activity_picture);
                }
                $data->activity_picture = 'image-postactivity/'.$imageName;
            }

            $data->activity_id = $request->activity_id;
            $data->activity_date = $request->activity_date;
            $data->calories = $request->calories;
            $data->caption = $request->caption;

            $data->save();

            return redirect()->back()->with("message","Post Edited.");




    }
}
