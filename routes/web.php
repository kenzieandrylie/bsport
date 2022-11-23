<?php

use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\FriendshipController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\GroupMemberController;
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
    return Inertia::render('Auth/Login');
});

Route::get('/back', function(){
    return redirect()->back();
});

//dashboard
Route::get('/dashboard', [GroupController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');
Route::delete('/mygroup/leave', [GroupMemberController::class, 'leave'])->middleware(['auth', 'verified'])->name('leave.group');
Route::delete('/mygroup/deletegroup',[GroupMemberController::class,'deletegroup'])->middleware(['auth', 'verified'])->name('delete.group');
//discover
Route::get('/discover', [GroupController::class, 'index_discover'])->middleware(['auth', 'verified'])->name('discover');
Route::post('/join-group',[GroupMemberController::class,'join'])->middleware(['auth', 'verified'])->name('join.group');
//creategroup
Route::get('/creategroup',[GroupController::class, 'index_create_group'])->middleware(['auth','verified'])->name('index.create.group');
Route::post('/creategroup',[GroupController::class, 'create_group'])->middleware(['auth','verified'])->name('create.group');
//feedback
Route::post('/feedback', [FeedbackController::class, 'create_feedback'])->middleware(['auth', 'verified'])->name('create.feedback');
//profile
Route::get('/profile',[FriendshipController::class, 'index_profile'])->middleware(['auth', 'verified'])->name('view.profile');

require __DIR__.'/auth.php';
