<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class PlayController extends Controller
{
	public function __construct()
	{
		$this->middleware('auth');
	}
	
	public function toPlay()
	{
		$user = \App\Data_user::find(\Auth::user()->id);
		$item = $user->data_user_item()->get();
		$data = $user->get();
		$items = $item;
		
		return response()->json($item);
		
	}
	
	public function fromPlay(Request $dataUser, $dataItems)
	{
		$user = \App\Data_user::find($dataUser->id);
		$user->game_played = $dataUser['game_played'];
		$user->score = $dataUser['score'];
		$user->kills = $dataUser['kills'];
		$user->save();
		
		$item = \App\Data_user_item::find($dataItem->id);
		$item->quantity = $dataItems['quantity'];
		$item->save();
	}
}
