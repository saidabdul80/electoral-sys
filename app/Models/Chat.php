<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    use HasFactory;
    protected $fillable = [
        'from_user_id',
        'to_user_id',
        'message',
        'message_type',
        'read',
        'token',
    ];  
    
    public function getFromStateAttribute() {               
        $state = State::find(Volunteer::find($this->from_user_id)?->state_id)?->name;        
        return "{$state}";
    }   
    
    public function getFromLgaAttribute() {               
        $state = Lga::find(Volunteer::find($this->from_user_id)?->lga_id)?->name;        
        return "{$state}";
    }   
    
    public function getFromWardAttribute() {               
        $state = Ward::find(Volunteer::find($this->from_user_id)?->ward_id)?->name;        
        return "{$state}";
    }   

    public function getToStateAttribute() {               
        $state = State::find(Volunteer::find($this->to_user_id)?->state_id)?->name;        
        return "{$state}";
    }   
    
    public function getToLgaAttribute() {               
        $state = Lga::find(Volunteer::find($this->to_user_id)?->lga_id)?->name;        
        return "{$state}";
    }   
    
    public function getToWardAttribute() {               
        $state = Ward::find(Volunteer::find($this->to_user_id)?->ward_id)?->name;        
        return "{$state}";
    }   
    
    public function getFromAreaAttribute() {               
        $state = Ward::find(Volunteer::find($this->from_user_id)?->area_id)?->name;        
        return "{$state}";
    }   
    
    public function getToAreaAttribute() {               
        $state = Ward::find(Volunteer::find($this->to_user_id)?->area_id)?->name;        
        return "{$state}";
    }   

    public function getDateAttribute() {
        return Carbon::parse($this->created_at)->format('M d, Y h:i:sa');
    }
    
    protected $appends = ['from_ward', 'from_lga', 'from_state', 'to_ward', 'to_lga', 'to_state', 'from_area', 'to_area','date'];

}
