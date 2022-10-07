<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Configuration extends Model
{
    use HasFactory; 
    protected $fillable = ['*'];
    protected $table = 'configurations';
    /*
     */
    public function getYearAttribute() {       
        
        $year = ElectionYear::find(Configuration::where('name','current_year')->first()->id);        
        if(!empty($year)){            
            return "{$year->year}";
        }else{
            return '';
        }
    }

    public function getMonthAttribute() {
        $month = ElectionYear::find(Configuration::where('name','current_month')->first()->id);
        if(!is_null($month)){
            return "{$month->month}";
        }else{
            return '';
        }
    }

    protected $appends = ['year', 'month'];

}
