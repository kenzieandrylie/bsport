<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\GroupMember;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
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
                                select distinct g.*
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
                                select distinct g.*
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
        $validator = Validator::make($request->all(), $rules);
        if($validator->fails()){

            return redirect('/creategroup')->withErrors($validator)->withInput();
        }

        // KENZIE TAMBAH <- HAPUS COMMENT KALO DAH DI CEK
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

    // Edit Group
    public function index_edit_group(Request $request){

        $group = Group::find($request->id);

        if(auth()->user()->id != $group->creator_id) {
            abort(404);
        }
        else {
            $alluser = User::all();

            return Inertia::render('EditGroup',[
                'users' => $alluser,
                'group' => $group
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

        return redirect()->intended('/dashboard')
        ->with('message','Grup "'.$request->name. '" berhasil diupdate.');
    }

}
