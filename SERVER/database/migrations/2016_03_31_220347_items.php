<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Items extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
    	Schema::create ( 'items', function (Blueprint $table) {
    		 
    		$table->increments('id');
    		$table->integer('type_id', false, true);
    		$table->string('name');
    		$table->integer('capacity')->nullable();
    		$table->integer('value')->nullable();
    		$table->integer('price');
    		$table->boolean('payed');
    		$table->string('description');
    		$table->string('image');
    		 
    		$table->foreign('type_id')
    		->references('id')
    		->on('types')
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
    	Schema::drop('items');
    }
}
