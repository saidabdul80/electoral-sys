<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    use HasFactory;
    
    
    public function getStateAttribute() {       
        $lga_ids = State::find($this->state_id);        
        return $lga_ids?->name;
    } 

    public function getLgaAttribute() {       
        $lga_ids = Lga::find($this->lga_id);        
        return $lga_ids?->name;
    } 

    public function getWardAttribute() {       
        $lga_ids = Ward::find($this->ward_id);        
        return $lga_ids?->name;
    } 

    public function getAreaAttribute() {       
        $lga_ids = AreaList::find($this->area_id);
        return $lga_ids?->name;
    } 


    public function members()
    {
        return $this->belongsToMany(Volunteer::class, 'team_members',);        
    }
    
    protected $appends = ['state','lga','ward', 'area'];
}
