<?php

namespace App\Http\Controllers;

use App\Item;
use Illuminate\Http\Request;

use App\Http\Requests;

class ProfileController extends Controller
{
	public function __construct()
	{
		$this->middleware('auth');
	}
	
	public function index()
	{
		$user = \Auth::user();
		$items = $user->data_user->item()->get();
		$guns = [];

		$gunsIds = [];
		$armorsIds = [];

		foreach ($items as $item){
			if($item->type_id == 2){
			$guns[] = $item;
			$gunsIds[] = $item->id;
			}
			if($item->type_id == 6){
				$armors[]=$item;
				$armorsIds[] = $item->id;
			}
		}

		return $gunsIds;
		$playerData = [
				'userName'=>$user->name,
				'weapons'=>$gunsIds,
				'armor' => $armorsIds,
				'userId' => $user->id
		];
		$codedData =base64_encode(json_encode($playerData));

		//$codedData = openssl_encrypt($playerData,'camellia-256-cfb1','CSMANIA',false,'0114324313123123');

		if(isset($armors))
			return view('index')->with('data', $user->data_user)->with('guns', $guns)->with('armors', $armors);
		else{
			return view('index')->with('data', $user->data_user)->with('guns', $guns)->with('gameData', $codedData);
			
		}
	
	}
	
	public function addItems(Request $request)
	{
		
		
		$user = \Auth::user();
		$item = \App\Item::find($request['item_id']);
		if($user->data_user->money >= $item->price){ 
			$user->data_user->money -=  $item->price;
			$user->data_user->save();
			$data = \App\Data_user_item::firstOrCreate(['data_user_id' => $user->id, 'item_id' => $request['item_id']]);
			$data->increment('quantity');
		}
		
		return redirect('magazine')->with('data', $user->data_user);
		
	}
}
