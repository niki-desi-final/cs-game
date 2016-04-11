<?php

use Illuminate\Database\Seeder;

class TypesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('types')
        	->insert([
        	
        			'type' =>'bullet'
        	]);
        DB::table('types')
        	->insert([
        			 
        			'type' =>'gun'
        	]);
       	DB::table('types')
        	->insert([
        			 
        			'type' =>'granade'
        	]);
       	DB::table('types')
        	->insert([
        			 
        			'type' =>'armor'
        	]);
        	
        DB::table('types')
        	->insert([
        			'type' =>'premium'
        	]);
        	
        DB::table('types')
        ->insert([
        	'type' =>'armor'
        ]);
    }
}
