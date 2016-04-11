<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Data_user_item extends Model
{
	protected $table = 'data_user_item';
	protected $fillable = ['data_user_id', 'item_id', 'quantity'];
	public $timestamps = false;
	
	public function data_user()
	{
		return $this->belongsToMany(\App\Data_user::class);
	}
}
