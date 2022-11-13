<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AreaList extends Model
{
    use HasFactory;
    protected $table = 'area_lists';
    protected $fillable = ['*'];  

    public function getWardAttribute() {                       
        $ward = Ward::find($this->ward_id)?->name;        
        return "{$ward}";
    }    

    public function getLgaAttribute() {       
        
        $lga = Lga::find($this->lga_id)?->name;        
        return "{$lga}";
    }    

    public function getStateAttribute() {       
        
        $state = State::find($this->state_id)?->name;        
        return "{$state}";
    }    
    
    protected $appends = ['ward', 'lga', 'state'];
}
