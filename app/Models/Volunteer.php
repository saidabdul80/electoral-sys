<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
class Volunteer extends Model
{
    use HasApiTokens, HasFactory, Notifiable;
    protected  $table = 'volunteers';
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

    public function team()
    {
        return $this->belongsToMany(Team::class, 'team_members');        
    }
    
    protected $appends = ['state','lga','ward', 'area','msisdn'];
}
