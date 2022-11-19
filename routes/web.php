<?php

use App\Http\Controllers\AreaListController;
use App\Http\Controllers\CampaignAnalysisController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\Dashboard;
use App\Http\Controllers\DataUpload;
use App\Http\Controllers\EventController;
use App\Http\Controllers\ExpensesController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\SmsController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\TeamMemberController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VolunteerController;
use App\Http\Controllers\VoterDatabaseController;
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
    return Inertia::render('Auth/Login', [
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

Route::get('/area_list',[AreaListController::class,'index'])->middleware(['auth', 'verified', 'adminAuth'])->name('area_list');
Route::post('/add_area',[AreaListController::class,'addArea'])->middleware(['auth', 'verified', 'adminAuth'])->name('add_area');

Route::get('/volunteer_management',[VolunteerController::class,'index'])->middleware(['auth', 'verified', 'adminAuth'])->name('volunteer_management');
Route::post('/add_volunteer',[VolunteerController::class,'addVolunteers'])->middleware(['auth', 'verified', 'adminAuth'])->name('add_volunteer');
Route::get('/volunteers',[VolunteerController::class,'all'])->middleware(['auth', 'verified', 'adminAuth'])->name('volunteers');
Route::get('/volunteers_not_in_team/{team_id}',[VolunteerController::class,'volunteers_not_in_team'])->middleware(['auth', 'verified', 'adminAuth'])->name('volunteers_not_in_team');
Route::post('/upload_volunteer_data',[VolunteerController::class,'uploadData'])->middleware(['auth', 'verified'])->name('upload_volunteer_data');

Route::get('/voter_database',[VoterDatabaseController::class,'index'])->middleware(['auth', 'verified', 'adminAuth'])->name('voter_database');
Route::post('/add_voters',[VoterDatabaseController::class,'addVoters'])->middleware(['auth', 'verified', 'adminAuth'])->name('add_voters');

Route::get('/team',[TeamController::class,'index'])->middleware(['auth', 'verified', 'adminAuth'])->name('team');
Route::post('/add_team',[TeamController::class,'add_team'])->middleware(['auth', 'verified', 'adminAuth'])->name('add_team');
Route::post('/delete_team',[TeamController::class,'delete_team'])->middleware(['auth', 'verified', 'adminAuth'])->name('delete_team');

Route::get('/event',[EventController::class,'index'])->middleware(['auth', 'verified', 'adminAuth'])->name('event');
Route::post('/save_event',[EventController::class,'saveEvent'])->middleware(['auth', 'verified', 'adminAuth'])->name('save_event');
Route::post('/delete_event',[EventController::class,'deleteEvent'])->middleware(['auth', 'verified', 'adminAuth'])->name('delete_event');

Route::get('/campaign_analysis',[CampaignAnalysisController::class,'index'])->middleware(['auth', 'verified', 'adminAuth'])->name('campaign_analysis');

Route::get('/expenses',[ExpensesController::class,'index'])->middleware(['auth', 'verified', 'adminAuth'])->name('expenses');

Route::post('/delete_category',[ExpensesController::class,'deleteCategory'])->middleware(['auth', 'verified', 'adminAuth'])->name('delete_category');
Route::post('/delete_expense',[ExpensesController::class,'deleteExpense'])->middleware(['auth', 'verified', 'adminAuth'])->name('delete_expense');

Route::post('/save_category',[ExpensesController::class,'saveCategory'])->middleware(['auth', 'verified', 'adminAuth'])->name('save_category');
Route::post('/save_expense',[ExpensesController::class,'saveExpense'])->middleware(['auth', 'verified', 'adminAuth'])->name('save_expense');


Route::get('/sms',[SmsController::class,'index'])->middleware(['auth', 'verified', 'adminAuth'])->name('sms');
Route::post('/sendsms',[SmsController::class,'send'])->middleware(['auth', 'verified', 'adminAuth'])->name('sendsms');

Route::get('/lgas/{state_id}',[ProfileController::class,'lgas'])->name('lgas');
Route::get('/wards/{lga_id}',[ProfileController::class,'wards'])->middleware(['auth', 'verified', 'adminAuth'])->name('wards');
Route::get('/areas/{ward_id}',[ProfileController::class,'areas'])->middleware(['auth', 'verified', 'adminAuth'])->name('areas');
Route::get('/team_members/{team_id}',[TeamMemberController::class,'teamMembers'])->middleware(['auth', 'verified', 'adminAuth'])->name('team_members');
Route::post('/add_team_member',[TeamMemberController::class,'addTeamMember'])->middleware(['auth', 'verified', 'adminAuth'])->name('add_team_member');
Route::post('/remove_team_member',[TeamMemberController::class,'removeTeamMember'])->middleware(['auth', 'verified', 'adminAuth'])->name('remove_team_member');


Route::post('/fetch_status',[ChatController::class,'fetchStatus'])->middleware(['auth', 'verified'])->name('fetch_status');
Route::post('/send_message',[ChatController::class,'sendMessage'])->middleware(['auth', 'verified'])->name('send_message');
Route::post('/typing',[ChatController::class,'typing'])->middleware(['auth', 'verified'])->name('typing');
Route::post('/mark_read',[ChatController::class,'markRead'])->middleware(['auth', 'verified'])->name('mark_read');

Route::get('/chats',[ChatController::class,'index'])->middleware(['auth', 'verified'])->name('chats');
Route::post('/fetch_conversation',[ChatController::class,'fetchConversation'])->middleware(['auth', 'verified'])->name('fetch_conversation');


Route::get('/settings',[SettingController::class,'index'])->middleware(['auth', 'verified', 'adminAuth'])->name('settings');
Route::get('/profile',[ProfileController::class,'index'])->middleware(['auth', 'verified', 'adminAuth'])->name('profile');


Route::get('/xdashboard',[Dashboard::class,'loadDash'])->middleware(['auth', 'verified', 'adminAuth'])->name('xdashboard');
//Route::get('/user',[UserController::class,'index'])->middleware(['auth', 'verified', 'adminAuth'])->name('user');
Route::post('/get_data',[Dashboard::class,'getData'])->middleware(['auth', 'verified', 'adminAuth'])->name('get_data');
Route::post('registerx', [UserController::class, 'store'])->middleware(['auth', 'verified', 'adminAuth'])->name('registerx');
require __DIR__.'/auth.php';
 