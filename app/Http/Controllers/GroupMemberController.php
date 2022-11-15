<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\GroupMember;
use Illuminate\Http\Request;

class GroupMemberController extends Controller
{
    //Dashboard
    public function leave(Request $request){
        $groupmember = GroupMember::find($request->id);
        $groupmember->delete();

        return redirect()->back()->with('message','Anda berhasil keluar grup "' . $groupmember->group->name . '" !');

    }

    public function deletegroup(Request $request){

        $group = Group::where('id','=',$request->id)->first();
    

        $group->status = 0;
        $group->save();
        GroupMember::where('group_id','=',$request->id)->delete();
        return redirect()->back()->with('message','Anda berhasil menghapus grup "'.$group->name.'"!');

    }


    //Discover
    public function join(Request $request){
        $newMember = new GroupMember();
        $newMember->group_id = $request->groupId;
        $newMember->user_id = auth()->user()->id;
        $newMember->save();

        return redirect()->intended('/dashboard')->with('message','Anda berhasil bergabung grup "' . $newMember->group->name . '" !');
    }
}
