<?php

use App\Http\Controllers\FeedbackController;
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

//feedback
Route::post('/feedback', [FeedbackController::class, 'createFeedback'])->middleware(['auth', 'verified'])->name('create.feedback');

require __DIR__.'/auth.php';
