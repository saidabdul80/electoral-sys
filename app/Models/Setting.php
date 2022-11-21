<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;
    protected $hidden = ['model','seeds'];
    protected $table = "configurations";

    public function getDataAttribute(){
        if($this->model != NULL){
            return $this->model::all();
        }else if( $this->seeds != NULL){
            $array = explode(',', $this->seeds);
            foreach($array as $index => &$value ){
                $array[$index] = ['id'=> $value, 'name'=>$value];
            }
            return $array;
        }
    }
    
    public function getTitleAttribute(){
        return str_replace('_',' ',$this->name);
   }

   protected $appends = ['title','data'];
}
