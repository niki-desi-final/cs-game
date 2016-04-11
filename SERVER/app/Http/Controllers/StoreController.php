<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class StoreController extends Controller
{
	public function __construct()
	{
		$this->middleware('auth');
	}
	
	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index()
	{
		$data = \App\Data_user::find(\Auth::user()->id);
		$items = \App\Item::all();
		return view('/magazine')->with('items', $items)->with('data', $data);
	}
	
	/* public function buyItem(Request $item_id)
	{
		$user = \Auth::user();
		$item = \App\Item::find($item_id);
		if($user->data_user->money >= $item->price){
			$user->data_user->money -=  $item->price;
			$user->data_user->save();
			$data = \App\Data_user_item::firstOrCreate(['data_user_id' => $user->id, 'item_id' => $item_id]);
			$data->increment('quantity');
			
		}
	}*/

}
