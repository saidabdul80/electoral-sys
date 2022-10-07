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
}
