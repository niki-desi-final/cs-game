<?php

namespace App\Http\Controllers;

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
		
		
		foreach ($items as $item){
			if($item->type_id == 2){
			$guns[] = $item;
			}
			if($item->type_id == 3){
				$granades[]=$item;
			}
			if($item->type_id == 6){
				$armors[]=$item;
			}
		}	
		/* if(isset($armors)){	
			if(isset($granades)){
				return view('index')->with('data', $user->data_user)->with('guns', $guns)->with('granades', $granades)->with('armors', $armors);
			}
			else{
				return view('index')->with('data', $user->data_user)->with('guns', $guns)->with('armors', $armors);
			}
		}
		
		*/if(isset($armors))
			return view('index')->with('data', $user->data_user)->with('guns', $guns)->with('armors', $armors);
		else{
			return view('index')->with('data', $user->data_user)->with('guns', $guns);
			
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
