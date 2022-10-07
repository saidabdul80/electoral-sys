<?php

use App\Http\Controllers\DataUpload;
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

Route::get('/dashboard', function () {    
    return Inertia::render('AdminDashboard');
})->middleware(['auth', 'verified', 'adminAuth'])->name('dashboard');

require __DIR__.'/auth.php';
