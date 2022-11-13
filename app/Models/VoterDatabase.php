<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VoterDatabase extends Model
{
    use HasFactory;
    protected  $table = 'voters';
    protected $fillable = ['*'];

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
    
    public function getMsisdnAttribute() {       
        return $this->phone;
    } 

    protected $appends = ['state','lga','ward', 'area','msisdn'];

}
