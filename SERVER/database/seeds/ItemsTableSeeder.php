<?php

use Illuminate\Database\Seeder;

class ItemsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	
    	DB::table('items')
    		->insert([
    				'type_id'=> '2',
    				'name'=> 'MyPistol',
    				'capacity' => '20',
    				'value' => '4',
    				'price' => '3',
    				'payed' => '0',
    				'description' => 'Your default gun',
    				'image' => '/images/12.jpg'
    	]);
    		
    	
        DB::table('items')
        	->insert([
        			'type_id'=> '1',
        			'name'=> 'Bullet',
        			'capacity' => '0',
        			'value' => '0',
        			'price' => '3',
        			'payed' => '0',
        			'description' => '',
        			'image' => '/images/bullet.jpg'
        	]);
        	
        	DB::table('items')
        	->insert([
        			'type_id'=> '1',
        			'name'=> 'GoldBullet',
        			'capacity' => '0',
        			'value' => '4',
        			'price' => '6',
        			'payed' => '1',
        			'description' => 'With GoldBullet you can cause more damage to the enemy',
        			'image' => '/images/bullet.jpg'
        	]);
        	
        	DB::table('items')
        	->insert([
        			'type_id'=> '3',
        			'name'=> 'SmokeGranade',
        			'capacity' => '0',
        			'value' => '0',
        			'price' => '300',
        			'payed' => '0',
        			'description' => 'Can be use to provide temporary covor for moving from place to place. Make you invisible for 10 sec',
        			'image' => '/images/31.jpg'
        	]);
        	
        	DB::table('items')
        	->insert([
        			'type_id'=> '3',
        			'name'=> 'Granade',
        			'capacity' => '0',
        			'value' => '30',
        			'price' => '400',
        			'payed' => '0',
        			'description' => 'A high-explosive device. Damage 30.',
        			'image' => '/images/30.jpg'
        	
        			]);
        	
        	DB::table('items')
        	->insert([
        			'type_id'=> '2',
        			'name'=> '9X19MM SIDEARM',
        			'capacity' => '20',
        			'value' => '5',
        			'price' => '400',
        			'payed' => '0',
        			'description' => 'The perfect weapon for beginners.',
        			'image' => '/images/13.jpg'
        	]);
        	
        	DB::table('items')
        	->insert([
        			'type_id'=> '2',
        			'name'=> '228 COMPACT',
        			'capacity' => '25',
        			'value' => '6',
        			'price' => '600',
        			'payed' => '0',
        			'description' => 'It is a moderately powerful semi-automatic pistol',
        			'image' => '/images/19.jpg'
        	]);
        	
        	DB::table('items')
        	->insert([
        			'type_id'=> '2',
        			'name'=> 'M3 Super',
        			'capacity' => '35',
        			'value' => '10',
        			'price' => '1600',
        			'payed' => '0',
        			'description' => 'That it has a more-or-less normal distribution of letters, as opposed to using. Content here, content here, making it look like readable',
        			'image' => '/images/18.jpg'
        	]);
        	
        	DB::table('items')
        	->insert([
        			'type_id'=> '2',
        			'name'=> 'CV 47',
        			'capacity' => '40',
        			'value' => '8',
        			'price' => '900',
        			'payed' => '0',
        			'description' => 'It is one of the most powerful guns in the game known for its power and its range.',
        			'image' => '/images/9.jpg'
        	]);
        	
        	DB::table('items')
        	->insert([
        			'type_id'=> '2',
        			'name'=> 'M249',
        			'capacity' => '50',
        			'value' => '10',
        			'price' => '1300',
        			'payed' => '0',
        			'description' => 'It is a long established fact that a reader will be distracted. By the readable content of a page when looking.',
        			'image' => '/images/10.jpg'
        	]);
        	
        	DB::table('items')
        	->insert([
        			'type_id'=> '2',
        			'name'=> 'Leone YG1265',
        			'capacity' => '50',
        			'value' => '15',
        			'price' => '1500',
        			'payed' => '0',
        			'description' => 'The Leone YG1265 is a very powerful shotgun. It is very effective in long distance combat. ',
        			'image' => '/images/16.jpg'
        	]);
        	
        	DB::table('items')
        	->insert([
        			'type_id'=> '2',
        			'name'=> 'D3-AU1',
        			'capacity' => '100',
        			'value' => '18',
        			'price' => '2500',
        			'payed' => '0',
        			'description' => 'Very powerful weapon. With it you can kill eemy from very long distance',
        			'image' => '/images/14.jpg'
        	]);
        	
        	DB::table('items')
        	->insert([
        			'type_id'=> '5',
        			'name'=> 'Premium account',
        			'capacity' => '0',
        			'value' => '14',
        			'price' => '9.99',
        			'payed' => '1',
        			'description' => 'Premium account for 14 days.',
        			'image' => '/images/m249.jpg'
        	]);
        	
        	DB::table('items')
        	->insert([
        			'type_id'=> '5',
        			'name'=> 'Premium account',
        			'capacity' => '0',
        			'value' => '7',
        			'price' => '4,99',
        			'payed' => '1',
        			'description' => 'Premium account for 7 days',
        			'image' =>'/images/m249.jpg'
        	]);
        	
        	DB::table('items')
        	->insert([
        			'type_id'=> '6',
        			'name'=> 'Kevlar Vest',
        			'capacity' => '0',
        			'value' => '7',
        			'price' => '600',
        			'payed' => '0',
        			'description' => 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those',
        			'image' =>'/images/20.jpg'
        	]);
        	
        	DB::table('items')
        	->insert([
        			'type_id'=> '6',
        			'name'=> 'Kevlar + Helmet',
        			'capacity' => '0',
        			'value' => '10',
        			'price' => '800',
        			'payed' => '0',
        			'description' => 'It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures',
        			'image' =>'/images/21.jpg'
        	]);
    }
}
