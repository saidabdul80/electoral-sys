<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lga extends Model
{
    use HasFactory;
    protected $table = "lgas";
    public function wards(){
       return $this->hasMany(Ward::class);
    }


    public function getWardCountAttribute() {       
        
        $num = Ward::where('lga_id',$this->id)->count();        
        return "{$num}";
    }

    public function getCheckedAttribute() {                  
        $true = true;
        return 'true';
    }
    public function state(){
     return $this->belongsTo(State::class);
    }
    protected $appends = ['ward_count', 'checked'];

}
