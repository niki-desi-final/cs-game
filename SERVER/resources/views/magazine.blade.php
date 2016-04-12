@extends('layouts.app')
 @section('title')
  Magazine 
 @endsection
 @section('css')
 <link href="css/mag.css" rel="stylesheet">
 @endsection
 @section('content')
<div class = "row">
	<div class = "col-md-3 mag">
		 <ul id= "double" class = " jumbotron pff col-md-12 col-sd-12">
			 @foreach($items as $item)
				 @if($item->payed == 0 && $item->id > 5)
				 <form method = "post" action = "/magazine" class="form col-md-12 col-sd-12">
					 <input type="hidden" name="_token" value="{{ csrf_token() }}">
					 <input type= "hidden" name = "item_id" value = "{{$item->id}}">
						 <li id = '{{$item->id}}' class = "double " >
							 <div class = "pic "><img src = "{{$item->image}}" class = "img-responsive">
							 		<div class = "text">
							 			<div class = "title" ><b>Name: {{$item->name}}</b></div>
								 		<div><b>Description:</b> {{$item->description}}</div>
								 		@if($item->type_id=='2')
								 			<div><b>Demage:</b>{{$item->value}}</div>
								 		@endif
								 		@if($item->type_id == '4')
								 			<div ><b>Add:</b>{{$item->value}}%</div>
										 @endif
								 		<div ><b>Price:</b>{{$item->price}}$</div>
								 		<button type= "submit" class = "btn btn-primary btn-lg btn-buy" id = "{{$item->name}}">Buy</button>
							 		</div>
						 		</div>
						 	</li>	 
				 		@endif
					</form>
		 	@endforeach
				
		 </ul>
	</div>
</div>
	
	
 @endsection
 