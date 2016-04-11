<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
 		protected $fillable = ['type_id', 'name', 'capacity', 'value', 'price', 'description', 'image'];
 		
 		public function type()
 		{
 			return $this->belongsTo(\App\Type::class);
 		}
 		
 		public function data_user()
 		{
 			return $this->belongsToMany(\App\Data_user::class);
 		}
 		 
 		 public function data_user_item()
 		{
 			return $this->hasMany(\App\Data_user_item::class);
 		}  
}
