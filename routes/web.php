<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\FriendshipController;
use App\Http\Controllers\GroupActivityController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\GroupMemberController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', function () {
    return Inertia::render('Landing');
})->middleware('guest');

Route::get('/storage-link', function () {
    $targetFolder = storage_path('app/public');
    $linkFolder = $_SERVER['DOCUMENT_ROOT'] . '/storage';
    symlink($targetFolder, $linkFolder);
});

Route::get('/back', function(){
    return redirect()->back();
});
Route::group(['middleware'=>'user'],function(){
//dashboard
Route::delete('/mygroup/leave', [GroupMemberController::class, 'leave'])->middleware(['auth', 'verified'])->name('leave.group');
Route::delete('/mygroup/deletegroup',[GroupMemberController::class,'deletegroup'])->middleware(['auth', 'verified'])->name('delete.group');
//discover
Route::get('/discover', [GroupController::class, 'index_discover'])->middleware(['auth', 'verified'])->name('discover');
Route::post('/join-group',[GroupMemberController::class,'join'])->middleware(['auth', 'verified'])->name('join.group');
//group
Route::get('/creategroup',[GroupController::class, 'index_create_group'])->middleware(['auth','verified'])->name('index.create.group');
Route::post('/creategroup',[GroupController::class, 'create_group'])->middleware(['auth','verified'])->name('create.group');
Route::get('/editgroup/{pin}',[GroupController::class, 'index_edit_group'])->middleware(['auth','verified'])->name('index.edit.group');
Route::post('/editgroup',[GroupController::class, 'edit_group'])->middleware(['auth','verified'])->name('edit.group');
//group detail
Route::get('/groups/{pin}',[GroupActivityController::class, 'index_group_detail'])->middleware(['auth','verified'])->name('group.detail');
Route::post('/createpost',[GroupActivityController::class, 'create_post'])->middleware(['auth','verified'])->name('create.post');
Route::post('/editpost',[GroupActivityController::class, 'edit_post'])->middleware(['auth','verified'])->name('edit.post');
Route::delete('/deletepost',[GroupActivityController::class, 'delete_post'])->middleware(['auth','verified'])->name('delete.post');
//feedback
Route::post('/feedback', [FeedbackController::class, 'create_feedback'])->middleware(['auth', 'verified'])->name('create.feedback');
//profile
Route::post('/follow', [FriendshipController::class, 'follow'])->middleware(['auth', 'verified'])->name('follow.user');
Route::delete('/unfollow', [FriendshipController::class, 'unfollow'])->middleware(['auth', 'verified'])->name('unfollow.user');
Route::get('/editprofile',[ProfileController::class, 'index_edit_profile'])->middleware(['auth', 'verified'])->name('index.edit.profile');
Route::post('/editpassword', [ProfileController::class, 'edit_password'])->middleware(['auth', 'verified'])->name('edit.password');
Route::post('/editprofile', [ProfileController::class, 'edit_profile'])->middleware(['auth', 'verified'])->name('edit.profile');
//leaderboard
Route::get('/leaderboards/{pin}',[GroupActivityController::class,'index_leaderboard'])->middleware(['auth','verified'])->name('group.leaderboard');
//like
Route::post('/like',[LikeController::class,'like'])->middleware(['auth', 'verified'])->name('like');
Route::delete('/unlike', [LikeController::class,'unlike'])->middleware(['auth', 'verified'])->name('unlike');
//comment
Route::post('/comment',[CommentController::class,'create_comment'])->middleware(['auth', 'verified'])->name('add.comment');
});
Route::group(['middleware'=>'auth'],function(){
    Route::get('/homepage', [GroupController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');
    Route::get('/profile/{username}',[ProfileController::class, 'index_profile'])->middleware(['auth', 'verified'])->name('view.profile');
    //Route::post('/profile/{username}',[ProfileController::class, 'index_profile_post'])->middleware(['auth', 'verified'])->name('view.profile.post');
});
//Admin
Route::group(['middleware'=>'admin'],function(){
    Route::post('/homepage', [GroupController::class, 'index_post'])->middleware(['auth', 'verified'])->name('dashboard.post');
    Route::post('/ban',[ProfileController::class,'ban_user'])->middleware(['auth', 'verified'])->name('ban.user');
    Route::post('/unban',[ProfileController::class,'unban_user'])->middleware(['auth', 'verified'])->name('unban.user');
    Route::post('/role',[ProfileController::class,'change_role'])->middleware(['auth', 'verified'])->name('change.role');
});

require __DIR__.'/auth.php';
