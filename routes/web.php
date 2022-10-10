<?php

use App\Http\Controllers\Dashboard;
use App\Http\Controllers\DataUpload;
use App\Http\Controllers\UserController;
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

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/data-upload', [DataUpload::class,'index'])->middleware(['auth', 'verified'])->name('data-upload');
Route::post('/save_data_entry', [DataUpload::class,'save'])->middleware(['auth', 'verified'])->name('save_data_entry');
Route::post('/get_saved_data', [DataUpload::class,'getData'])->middleware(['auth', 'verified'])->name('get_saved_data');
Route::post('/upload_slw', [DataUpload::class,'uploadSLW'])->middleware(['auth', 'verified'])->name('upload_slw');
Route::post('/upload_records', [DataUpload::class,'uploadRecords'])->middleware(['auth', 'verified'])->name('upload_records');

Route::get('/dashboard',[Dashboard::class,'index'])->middleware(['auth', 'verified', 'adminAuth'])->name('dashboard');
Route::get('/user',[UserController::class,'index'])->middleware(['auth', 'verified', 'adminAuth'])->name('user');
Route::post('/get_data',[Dashboard::class,'getData'])->middleware(['auth', 'verified', 'adminAuth'])->name('get_data');
Route::post('registerx', [UserController::class, 'store'])->middleware(['auth', 'verified', 'adminAuth'])->name('registerx');
require __DIR__.'/auth.php';
 