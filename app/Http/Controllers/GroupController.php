<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\GroupMember;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GroupController extends Controller
{
    //Dashboard
    public function index()
    {
        $mygroups = Group::join('group_members','group_members.group_id','=','groups.id')
            ->where('group_members.user_id',auth()->user()->id)->get();

        return Inertia::render('Dashboard', [
            'mygroups' => $mygroups
        ]);
    }

    public function leave(Request $request){
        $groupmember = GroupMember::find($request->id);
        $groupmember->delete();

        return redirect()->back()->with('message','Anda berhasil keluar grup ' . $groupmember->group->name . '!');

    }
}
