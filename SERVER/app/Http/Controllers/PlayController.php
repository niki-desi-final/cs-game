<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class PlayController extends Controller
{
	public function __construct()
	{
		//$this->middleware('auth');
	}
	
	public function toPlay($id)
	{
		$user = \App\Data_user::find($id);
		$item = $user->data_user_item()->get();
		$data = $user->get();
		$items = $item;
		
		return response()->json($item);
		
	}
	
	public function fromPlay(Request $request)
	{
		$id = $request['id'];
		$user = \App\Data_user::find($id);
		$user->game_played += $request['rounds'];
		$user->score += $request['scores'];
		$user->kills += $request['kills'];
		$user->money += $request['money'];
		$user->save();
		return $user;
	}
}
