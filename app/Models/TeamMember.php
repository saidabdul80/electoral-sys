<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeamMember extends Model
{
    use HasFactory;
    protected $fillable=['*'];
    protected $table = 'team_members';

  

    /*  public function getVolunteerAttribute() {       
        return Volunteer::find($this->volunteer_id);
    } 
    public function getTeamAttribute() {       
        return Volunteer::find($this->volunteer_id);
    }  */

/*     protected $appends = ['volunteer']; */
}
