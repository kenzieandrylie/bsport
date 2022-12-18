<?php

namespace App\Http\Controllers;

use App\Models\GroupActivity;
use App\Models\Like;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    //
    public function like (Request $request) {

        $like = new Like();
        $like->group_activity_id = $request->post_id;
        $like->user_id = auth()->user()->id;
        $like->save();

        return redirect()->back();
    }

    public function unlike(Request $request){
        Like::where('user_id','=',auth()->user()->id)
        ->where('group_activity_id','=',$request->post_id)
        ->delete();

        return redirect()->back();
    }
}
