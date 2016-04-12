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
        			'name'=> 'USP',
        			'capacity' => '20',
        			'value' => '6',
        			'price' => '500',
        			'payed' => '0',
        			'description' => 'The USP is a semi-automatic pistol. It has high acuracy and low recoil, but low armor penetration power and low rate of fire.',
        			'image' => '/images/usp.jpg'
        	]);
        	
        	DB::table('items')
        	->insert([
        			'type_id'=> '2',
        			'name'=> 'AK47',
        			'capacity' => '25',
        			'value' => '20',
        			'price' => '7000',
        			'payed' => '0',
        			'description' => 'The AK-47  is a selective-fire (semi-automatic and automatic), gas-operated assault rifle. It has high demage, fast reload and is effective at all range.',
        			'image' => '/images/ak47.jpg'
        	]);
        	
        	DB::table('items')
        	->insert([
        			'type_id'=> '2',
        			'name'=> 'P90',
        			'capacity' => '35',
        			'value' => '10',
        			'price' => '5000',
        			'payed' => '0',
        			'description' => 'The P90 is a personal defense weapon. It has stable accuracy and low recoil even with continuous fire. It is a fairly light weapon.',
        			'image' => '/images/p90.jpg'
        	]);
        	
        	DB::table('items')
        	->insert([
        			'type_id'=> '2',
        			'name'=> 'AWP',
        			'capacity' => '40',
        			'value' => '50',
        			'price' => '10000',
        			'payed' => '0',
        			'description' => 'The AWP is a powerful bolt-action sniper rifle. It has fatal demadge, high penetration power and is very acurateat long range.',
        			'image' => '/images/awp.jpg'
        	]);
        	
        	DB::table('items')
        	->insert([
        			'type_id'=> '2',
        			'name'=> 'M4A1',
        			'capacity' => '50',
        			'value' => '18',
        			'price' => '7500',
        			'payed' => '0',
        			'description' => 'The M4A1 is a moderately powerful assault rifle that can be mastered for nearly every situation. It is excellent at close to medium range and is very light.',
        			'image' => '/images/m4a1.jpg'
        	]);
        	
        	DB::table('items')
        	->insert([
        			'type_id'=> '2',
        			'name'=> 'FNF2000',
        			'capacity' => '50',
        			'value' => '10',
        			'price' => '4500',
        			'payed' => '0',
        			'description' => 'The F2000 is a selective fire weapon operating from a closed bolt. The F2000 is a gas operated, fully automatic and ambidextrous bullpup rifle.',
        			'image' => '/images/fnf2.jpg'
        	]);
        	
        	DB::table('items')
        	->insert([
        			'type_id'=> '6',
        			'name'=> 'Kevlar Vest',
        			'capacity' => '0',
        			'value' => '7',
        			'price' => '600',
        			'payed' => '0',
        			'description' => 'Kevlar body armor reduces damage taken by players from bullets by a percentage that varies with the armor penetration of each weapon.',
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
        			'description' => 'Players can also buy a vest with a helmet which extends protection to the player\'s head. The helmet can save players from headshots. Like the vest, the helmet removes aimpunch from headshots. ',
        			'image' =>'/images/21.jpg'
        	]);
    }
}
