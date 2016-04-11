<?php

use App\Http\Controllers\Data_usersControler;
use App\Http\Controllers\Data_usersController;
/*
 * |--------------------------------------------------------------------------
 * | Application Routes
 * |--------------------------------------------------------------------------
 * |
 * | Here is where you can register all of the routes for an application.
 * | It's a breeze. Simply tell Laravel the URIs it should respond to
 * | and give it the controller to call when that URI is requested.
 * |
 */




  Route::group ( [ 'middleware' => 'web' ], function () {
	Route::get('/', function(){
		if(Auth::user()){
			return redirect('/home');
		}
		return view('welcome');
	});
  	
}); 
  	Route::group( ['middleware' => 'web'], function () {
  		Route::get('auth/facebook', 'Auth\AuthController@redirectToProvider');
  		Route::get('auth/facebook/callback', 'Auth\AuthController@handleProviderCallback');
  		Route::get('/home', 'ProfileController@index');
  	});
  
  
Route::group ( ['middleware' => 'web'], function () {
	Route::auth ();
	Route::get ( '/home', 'ProfileController@index' );
	Route::get('/magazine', 'StoreController@index');
	Route::get('/magazine/{item_id}','ProfileController@addItems');
	Route::post('/magazine', 'ProfileController@addItems');
	Route::get('/myStatistics', 'StatisticController@myStatistic');
	Route::get('/statisticScore', 'StatisticController@statisticScore');
	Route::get('/statisticGame', 'StatisticController@statisticGame');
	Route::get('/statisticKills', 'StatisticController@statisticKills');
	Route::get('/play', 'PlayController@toPlay');
	Route::post('/play', 'PlayController@fromPlay');
	Route::get('/comunity', 'ComunityController@index');
	
}); 
