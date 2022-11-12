<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use Illuminate\Http\Request;

class FeedbackController extends Controller
{
    //
    public function createFeedback(Request $request){

        $request->validate([
            'subject' => 'required',
            'detail' => 'required'
        ]);

        $feedback = new Feedback();
        $feedback->user_id = auth()->user()->id;
        $feedback->subject = $request->subject;
        $feedback->detail = $request->detail;

        $feedback->save();

        return redirect()->back();
    }
}
