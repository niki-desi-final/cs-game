<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Type extends Model
{
    protected $fillable = ['type'];
    
    public function item()
    {
    	return $this->HasMany(\App\Item::class);
    }
}
