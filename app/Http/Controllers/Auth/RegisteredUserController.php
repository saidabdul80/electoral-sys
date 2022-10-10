<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Controllers\UserController;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;


class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request, Event $event)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $lgas = implode(',',array_column(array_filter($request->lgas, function($item){
            if($item['checked']==true){
                return $item;
            }
        }),'id'));
        
        $user = User::create([
            'first_name' => $request->first_name,
            'surname' => $request->surname,
            'states' => implode(',',$request->states),
            'lgas' => $lgas,
            'role'=>$request->role,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        dd(2);
        $uController = new UserController;
        return $uController->index('Registered Successively');              
        //event(new UserController);                
    }
}
