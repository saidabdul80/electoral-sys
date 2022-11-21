<?php

namespace App\Http\Middleware;

use App\Models\Setting;
use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function share(Request $request)
    {
        return array_merge(parent::share($request), [

            // Synchronously
            'configura' => Setting::all(),

           /*  // Lazily
            'auth.user' => fn () => $request->user()
                ? $request->user()->only('id', 'name', 'email')
                : null, */
        ]);
    }
    protected function redirectTo($request)
    {
        if (! $request->expectsJson()) {
            return route('login');
        }
    }
}
