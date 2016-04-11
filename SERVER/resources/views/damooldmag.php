@extends('layouts.app')
 @section('title')
  Magazine 
 @endsection
 
 @section('content')
 <div id = "container">
 <div class="mag">
	 <ul id= "double" class = " jumbotron pff">
		 @foreach($items as $item)
			 @if($item->payed == 0 && $item->id > 2 && $item->id < 10 )
			 <form method = "post" action = "/magazine">
			 <input type="hidden" name="_token" value="{{ csrf_token() }}">
			 <input type= "hidden" name = "item_id" value = "{{$item->id}}">
				 <li id = '{{$item->id}}' class = "double" >
					 <div class = "pic"><img src = "{{$item->image}}">
					 	<div class = "text">
					 	<div class = "title" ><b>Name: {{$item->name}}</b></div>
						 <div><b>Description:</b> {{$item->description}}</div>
						 @if($item->type_id=='2' || $item->type_id=='3')
						 	<div><b>Demage:</b>{{$item->value}}</div>
						 @endif
						 @if($item->type_id == '4')
						 	<div ><b>Add:</b>{{$item->value}}%</div>
						 @endif
						 <div ><b>Price:</b>{{$item->price}}</div>
						 <button type= "submit" class = "btn btn-primary btn-lg">Buy</button>
					 	</div>
				 </div>
				 </li>	 
			 @endif
			</form>
		 @endforeach
	 </ul>
 </div >

 </div>
 @endsection
 