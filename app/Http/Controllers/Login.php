<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Volunteer;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class Login extends Controller
{
    public function storex(Request $request)
    {
        //$request->authenticate();
        $request->validate([            
            
          ]);
        $user = Volunteer::where(['volunteer_i'=>$request->get('username'), 'password'=>Hash::make($request->get('password'))])->first();
        dd($user);
        if (empty($user)){
            throw ValidationException::withMessages([
                'email' => trans('auth.failed'),
            ]);
        }
        Auth::login($user);
        $request->session()->regenerate();

        return redirect()->intended(RouteServiceProvider::HOME);
    }

    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required',
            'password' => 'required',
        ]);
     
        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials)) {                 
            $request->session()->regenerate();     
            if(auth()->user()->role =='admin'){
                return redirect()->route('xdashboard');
            }
            return redirect()->route('chats');
            
        }        
    
        throw ValidationException::withMessages([
            'email' => __('auth.failed'),
        ]);
    
        //return redirect("login")->withSuccess('Oppes! You have entered invalid credentials');
    }
}
