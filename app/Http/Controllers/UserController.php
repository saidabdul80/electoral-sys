<?php

namespace App\Http\Controllers;

use App\Models\Configuration;
use App\Models\ElectionFor;
use App\Models\ElectionMonth;
use App\Models\ElectionType;
use App\Models\ElectionYear;
use App\Models\State;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index($msg= null){
        $config = [
            'states'=> State::with('lgas')->get(),
            'election_months'=> ElectionMonth::all(),
            'election_years' => ElectionYear::all(),
            'election_types' => ElectionType::all(),
            'election_for' => ElectionFor::all(),
            'config' => Configuration::all(),
            'msg' =>$msg
        ];
        $users = User::paginate(200);       
        return Inertia::render('Team', ['users'=>$users, 'config'=>$config]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed'],
        ]);        
        $lg = array_column(array_filter($request->lgas, function($item){            
            if($item['checked']){
                return $item;
            }else{
                return false;
            }
        }),'id');
        $lgas = implode(',',$lg);     
        $states =   implode(',',$request->states);
        $user = User::create([
            'first_name' => $request->first_name,
            'surname' => $request->surname,
            'states' => $states,
            'lgas' => $lgas,
            'role'=>$request->role,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);       
        return Redirect::route('user');
    }
}
