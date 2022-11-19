<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\GroupMember;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class GroupController extends Controller
{
    //Dashboard
    public function index()
    {
        $mygroups = DB::table('groups')
                    ->join('group_members','group_members.group_id','=','groups.id')
                    ->where('group_members.user_id',auth()->user()->id)
                    ->get();

        $alluser = User::all();

        return Inertia::render('Dashboard', [
            'mygroups' => $mygroups,
            'users' => $alluser

        ]);
    }

    //Discover
    public function index_discover(){

        $auth_id = auth()->user()->id;

        $alluser = User::all();

        $publicgroups = DB::select(
                            "
                                select g.*
                                from groups g
                                join group_members gm on gm.group_id = g.id
                                where g.id not in
                                (select g.id from groups g join group_members gm on gm.group_id = g.id where gm.user_id = $auth_id)
                            "
                        );

        return Inertia::render('Discover', [
            'publicgroups' => $publicgroups,
            'users' => $alluser
        ]);
    }

    //Create Group
    public function index_create_group(){
        $auth_id = auth()->user()->id;

        $alluser = User::all();

        $publicgroups = DB::select(
                            "
                                select g.*
                                from groups g
                                join group_members gm on gm.group_id = g.id
                                where g.id not in
                                (select g.id from groups g join group_members gm on gm.group_id = g.id where gm.user_id = $auth_id)
                            "
                        );
        return Inertia::render('CreateGroup',[
            'publicgroups' => $publicgroups,
            'users' => $alluser
        ]);
    }
    public function create_group(Request $request){
        $rules = [
            'name'=>'required|min:8|unique:App\Models\Group,name',
            'description'=>'required',
            'display_picture'=>'required|mimes:jpg,bmp,png|max:2048',

        ];
        $validator =Validator::make($request->all(), $rules);
        if($validator->fails()){

            return redirect('/creategroup')->withErrors($validator)->withInput();
        }


        $alluser = User::all();

        $mygroups = DB::table('groups')
                    ->join('group_members','group_members.group_id','=','groups.id')
                    ->where('group_members.user_id',auth()->user()->id)
                    ->get();

        Group::create([
                            'name'=>$request->name,
                            'description'=>$request->description,
                            'display_picture'=>$request->display_picture,
                            'creator_id'=>auth()->user()->id,
                            'status'=>1
        ]);
        $newGroup = Group::where('name','=',$request->name)->first();
        GroupMember::create([
            'group_id'=>$newGroup->id,
            'user_id'=>auth()->user()->id
        ]);
        
        return redirect()->intended('/dashboard')
        ->with( 'mygroups' ,$mygroups)
        ->with( 'users' , $alluser)
        ->with('message','Group '.$request->name. 'berhasil dibuat.');
    }

}
