<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ElectionMonth extends Model
{
    use HasFactory;
    protected $fillable = ['*'];
    protected $table = 'election_months';
}
