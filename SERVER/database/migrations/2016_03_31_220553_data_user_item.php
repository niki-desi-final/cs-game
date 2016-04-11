<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DataUserItem extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
    	Schema::create ( 'data_user_item', function (Blueprint $table) {
    		 
    		$table->increments('id');
    		$table->integer('data_user_id', false, true);
    		$table->integer('item_id', false, true);
    		$table->integer('quantity');
    		
    		$table->foreign('data_user_id')
    		->references('id')
    		->on('data_users')
    		->onDelete('cascade');
    		
    		$table->foreign('item_id')
    		->references('id')
    		->on('items')
    		->onDelete('cascade');
    		
    		
    	});
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
    	Schema::drop('data_user_item');
    }
}
