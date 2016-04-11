<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Data_user extends Model
{
	
	
    protected $fillable = ['user_id', 'money', 'score', 'health', 'game_played'];
    
    
    public function user()
    {
    	return $this->belongsTo(\App\User::class);
    }
    
    public function item()
    {
    	return $this->belongsToMany(\App\Item::class);
    }
    
    public function data_user_item()
    {
    	return $this->hasMany(\App\Data_user_item::class);
    }
    
}
