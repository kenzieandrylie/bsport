<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use App\Models\Group;
use App\Models\GroupMember;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Illuminate\Support\Str;

class GroupController extends Controller
{
    //Dashboard
    public function index()
    {
        //dd($request);
        $mygroups = DB::table('groups')
                    ->join('group_members','group_members.group_id','=','groups.id')
                    ->where('group_members.user_id',auth()->user()->id)
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

        //ADMIN
        $allfeedback = DB::table('feedback')
        ->join('users','users.id','=','feedback.user_id')
        ->selectRaw('feedback.subject, feedback.detail, users.username')
        ->get();

        return Inertia::render('Dashboard', [
            'mygroups' => $mygroups,
            'users' => $alluser,
            'notifications' => $notification,
            'feedback' => $allfeedback
        ]);
    }

    public function index_post(Request $request)
    {
        //dd($request->all()["isSort"]);
        $sortOrder = $request->all()["sortOrder"];
        $isSort = $request->all()["isSort"];
        //dd($isSort['username']);
        $mygroups = DB::table('groups')
                    ->join('group_members','group_members.group_id','=','groups.id')
                    ->where('group_members.user_id',auth()->user()->id)
                    ->get();
        $alluser = User::all();
        if($isSort["username"] == true){
            $alluser = DB::table('users')
            ->orderBy('username',$sortOrder['username'])
            ->get();
        }
        if($isSort["email"] == true){
            $alluser = DB::table('users')
            ->orderBy('email',$sortOrder['email'])
            ->get();
        }

        if($isSort["role"] == true){
            $alluser = DB::table('users')
            ->orderBy('is_admin',$sortOrder['role'])
            ->get();
        }
        //dd($alluser);
        $time_from = Carbon::now()->subDays(1);
        $notification = DB::table('users')
                        ->join('friendships', 'users.id', '=', 'friendships.follower_id')
                        ->where('following_id','=',auth()->user()->id)
                        ->where('friendships.created_at','>=',$time_from)
                        ->get();

        //ADMIN
        $allfeedback = DB::table('feedback')
        ->join('users','users.id','=','feedback.user_id')
        ->selectRaw('feedback.subject, feedback.detail, users.username')

        ->get();

        return Inertia::render('Dashboard', [
            'mygroups' => $mygroups,
            'users' => $alluser,
            'notifications' => $notification,
            'feedback' => $allfeedback
        ]);
    }
    //Discover
    public function index_discover(){

        $auth_id = auth()->user()->id;

        $alluser = User::all();

        $publicgroups = DB::select(
                            "
                                select distinct g.*
                                from groups g
                                join group_members gm on gm.group_id = g.id
                                where g.id not in
                                (select g.id from groups g join group_members gm on gm.group_id = g.id where gm.user_id = $auth_id)
                            "
                        );

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

        return Inertia::render('Discover', [
            'publicgroups' => $publicgroups,
            'users' => $alluser,
            'notifications' => $notification
        ]);
    }

    //Create Group
    public function index_create_group(){
        $auth_id = auth()->user()->id;

        $alluser = User::all();

        $publicgroups = DB::select(
                            "
                                select distinct g.*
                                from groups g
                                join group_members gm on gm.group_id = g.id
                                where g.id not in
                                (select g.id from groups g join group_members gm on gm.group_id = g.id where gm.user_id = $auth_id)
                            "
                        );

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

        return Inertia::render('CreateGroup',[
            'publicgroups' => $publicgroups,
            'users' => $alluser,
            'notifications' => $notification
        ]);
    }
    public function create_group(Request $request){
        $rules = [
            'name'=>'required|min:8|unique:App\Models\Group,name',
            'description'=>'required',
            'display_picture'=>'required|mimes:jpg,bmp,png|max:2048',
        ];
        $validator = Validator::make($request->all(), $rules);
        if($validator->fails()){

            return redirect('/creategroup')->withErrors($validator)->withInput();
        }

        if($request->file('display_picture')) {

            $imageName = time().'.'.$request->file('display_picture')->getClientOriginalExtension();

            Storage::putFileAs('public/image-group',$request->file('display_picture'),$imageName);
        }

        $alluser = User::all();

        $mygroups = DB::table('groups')
                    ->join('group_members','group_members.group_id','=','groups.id')
                    ->where('group_members.user_id',auth()->user()->id)
                    ->get();

        Group::create([
                            'name'=>$request->name,
                            'description'=>$request->description,
                            'display_picture'=> 'image-group/'.$imageName,
                            'creator_id'=>auth()->user()->id,
                            'status'=>1,
                            'pin' => Str::random(10)
        ]);
        $newGroup = Group::where('name','=',$request->name)->first();
        GroupMember::create([
            'group_id'=>$newGroup->id,
            'user_id'=>auth()->user()->id
        ]);

        return redirect()->intended('/homepage')
        ->with( 'mygroups' ,$mygroups)
        ->with( 'users' , $alluser)
        ->with('message','Group '.$request->name. 'berhasil dibuat.');
    }

    // Edit Group
    public function index_edit_group(Request $request){

        $group = Group::where('pin','=',$request->pin)->first();

        if( !$group || auth()->user()->id != $group->creator_id) {
            abort(404);
        }
        else {
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

            return Inertia::render('EditGroup',[
                'users' => $alluser,
                'group' => $group,
                'notifications' => $notification
            ]);
        }
    }

    public function edit_group(Request $request){

        $request->validate([
            'name'=>['required','min:8',Rule::unique('groups')->ignore($request->id, 'id')],
            'description'=>'required',
            'display_picture'=>'nullable'
        ]);

        $group = Group::find($request->id);

        if($request->file('display_picture')) {

            $request->validate([
                'display_picture' => ['mimes:jpg,bmp,png','max:1024']
            ]);

            $imageName = time().'.'.$request->file('display_picture')->getClientOriginalExtension();

            if($group->display_picture){
                Storage::delete('public/'. $group->display_picture);
            }

            Storage::putFileAs('public/image-group',$request->file('display_picture'),$imageName);

            Group::whereId($group->id)->update([
                'display_picture' => 'image-group/'.$imageName
            ]);
        }

        Group::whereId($group->id)->update([
            'name' => $request->name,
            'description' => $request->description
        ]);

        return redirect()->intended('/homepage')
        ->with('message','Grup "'.$request->name. '" berhasil diupdate.');
    }

}
