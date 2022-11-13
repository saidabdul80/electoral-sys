<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;
    protected $fillable=['*'];
    protected $table='events';
    
    public function getStateAttribute()
    {
        return State::find($this->state_id)?->name;        
    }
    
    protected $appends = ['state'];
}
