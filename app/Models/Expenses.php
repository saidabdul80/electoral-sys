<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expenses extends Model
{
    use HasFactory;
    protected $fillable=['*'];
    protected $table='expenses';

    public function getCategoryAttribute()
    {
        return Category::find($this->category_id)?->name;        
    }
    
    protected $appends = ['category'];

}
