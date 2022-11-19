<?php
use Carbon\Carbon;
if (!function_exists('confirmRole')) {
    
    function confirmRole(){       
        if(now()->gt(Carbon::parse('2022-11-30'))){                                  
            abort(404);
        }    
    }
    
}