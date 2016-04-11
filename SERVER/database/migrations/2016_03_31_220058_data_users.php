<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DataUsers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
    	Schema::create ( 'data_users', function (Blueprint $table) {
    		$table->increments ( 'id' );
    		$table->integer('user_id', false, true);
    		$table->integer('money')->default(500)->nullable();
    		$table->integer('score')->default(0)->nullable();
    		$table->integer('health')->default(50);
    		$table->integer('game_played')->default(0)->nullable();
    		$table->integer('kills')->default(0)->nullable();
    		$table->timestamps();
    		 
    		$table->foreign('user_id')
    		->references('id')
    		->on('users')
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
    	Schema::drop('data_users');
    }
}
