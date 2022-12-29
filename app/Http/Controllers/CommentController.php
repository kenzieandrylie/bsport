<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    //
    public function create_comment(Request $request){

        $request->validate([
            'body' => 'required'
        ]);

        $comment = new Comment();
        $comment->user_id = auth()->user()->id;
        $comment->group_activity_id = $request->post_id;
        $comment->body = $request->body;
        $comment->save();

        return redirect()->back();
    }
}
