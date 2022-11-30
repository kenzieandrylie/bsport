<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ProfileController extends Controller
{
    //

    //edit profile
    public function index_edit_profile() {

        $alluser = User::all();

        return Inertia::render('EditProfile',[
            'users' => $alluser
        ]);
    }

    public function edit_profile(Request $request) {

        $request->validate([
            'name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'username' => ['required','string','max:20',Rule::unique('users')->ignore(auth()->user()->id, 'id')],
            'email' => ['required','string','max:255','email',Rule::unique('users')->ignore(auth()->user()->id, 'id')]
        ]);

        User::whereId(auth()->user()->id)->update([
            'name' => $request->name,
            'last_name' => $request->last_name,
            'username' => $request->username,
            'email' => $request->email
        ]);

        return redirect()->back()->with("message","Profile Updated.");
    }


    //edit password
    public function edit_password(Request $request){

        $request->validate([
            'current_password' => 'required|current_password',
            'password' => 'required|confirmed',
        ]);

        User::whereId(auth()->user()->id)->update([
            'password' => Hash::make($request->password)
        ]);

        return redirect()->back()->with("message","Password Updated!");
    }
}
