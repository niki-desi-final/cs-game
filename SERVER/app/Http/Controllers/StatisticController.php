<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class StatisticController extends Controller
{
	public function __construct()
	{
		$this->middleware('auth');
	}
	
	
	public function statisticGame()
	{
		$user = \Auth::user();	
		$sorts = \App\Data_user::orderBy('game_played')->paginate(5);
		return view('statistics')->with('data', $user->data_user)->with('sorts', $sorts);
	}
	
	public function statisticScore()
	{
		
		$data = \App\Data_user::find(\Auth::user()->id);
		$sorts = \App\Data_user::orderBy('score')->paginate(15);
		
		return view('statistics')->with('data', $data)->with('sorts', $sorts);
	
	}
	
	public function statisticKills()
	{

		$data = \App\Data_user::find(\Auth::user()->id);
		$sorts = \App\Data_user::orderBy('kills')->paginate(15);
		return view('statistics')->with('data', $data)->with('sorts', $sorts);
		
	}
	
	public function myStatistic()
	{
		$data = \App\Data_user::find(\Auth::user()->id);
		$sorts = $data->with('user')->get();
		return view('statistics')->with('data', $data)->with('sorts', $sorts);
	}
}
