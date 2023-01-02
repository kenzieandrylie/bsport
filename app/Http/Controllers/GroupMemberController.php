<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\GroupMember;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

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

        Storage::delete('public/'. $group->display_picture);
        $group->status = 0;
        $group->save();
        GroupMember::where('group_id','=',$request->id)->delete();
        return redirect()->back()->with('message','Anda berhasil menghapus grup "'.$group->name.'"!');

    }


    //Discover
    public function join(Request $request){

        if($request->pin) {
            $groupId = DB::table('groups')
                    ->where('pin','=',$request->pin)
                    ->first();

            if ($groupId === null) {
                return redirect()->back()->withErrors(['pin' => 'Group not found!']);
            }

            $checkMember = DB::table('group_members')
                            ->where('group_id','=',$groupId->id)
                            ->get();

            foreach($checkMember as $c){
                if($c->user_id == auth()->user()->id){
                    return redirect()->back()->withErrors(['pin' => 'You have joined the "'.$groupId->name.'" group!']);
                }
            }

            $newMember = new GroupMember();
            $newMember->group_id = $groupId->id;
            $newMember->user_id = auth()->user()->id;
            $newMember->save();
        }
        else{

            $newMember = new GroupMember();
            $newMember->group_id = $request->groupId;
            $newMember->user_id = auth()->user()->id;
            $newMember->save();
        }

        return redirect()->intended('/homepage')->with('message','Anda berhasil bergabung grup "' . $newMember->group->name . '" !');
    }
}
