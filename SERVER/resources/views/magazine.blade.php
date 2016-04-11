@extends('layouts.app')
 @section('title')
  Magazine 
 @endsection
 @section('css')
 <link href="css/magazine.css" rel="stylesheet">
 @endsection
 @section('content')

 <div class="mag">
 	<div id = "msg" class = "well"></div>
	 <ul id= "double" class = " jumbotron pff">
		 @foreach($items as $item)
			 @if($item->payed == 0 && $item->id > 5)
			 <form method = "post" action = "/magazine" class="form">
			 <input type="hidden" name="_token" value="{{ csrf_token() }}">
			 <input type= "hidden" name = "item_id" value = "{{$item->id}}">
				 <li id = '{{$item->id}}' class = "double" >
					 <div class = "pic"><img src = "{{$item->image}}">
					 	<div class = "text">
					 	<div class = "title" ><b>Name: {{$item->name}}</b></div>
						 <div><b>Description:</b> {{$item->description}}</div>
						 @if($item->type_id=='2')
						 	<div><b>Demage:</b>{{$item->value}}</div>
						 @endif
						 @if($item->type_id == '4')
						 	<div ><b>Add:</b>{{$item->value}}%</div>
						 @endif
						 <div ><b>Price:</b>{{$item->price}}</div>
						 <button type= "submit" class = "btn btn-primary btn-lg btn-buy" id = "{{$item->name}}">Buy</button>
					 	</div>
				 </div>
				 </li>	 
			 @endif
			</form>
		 @endforeach
	 </ul>
 </div >

 @endsection
 
 @section('script')
 <script type="text/javascript" src = "https://code.jquery.com/jquery-2.1.4.min.js"></script>
<script type="text/javascript">

$( document ).ready(function(){
	var msg = $('#msg').html();
	if(msg.length>0){
		msg.style.display = 'block';
	}
	$( '.form' ).submit(function(e){
		
		var res = {{$data->money}} - {{$item->price}};
		var name = $('.btn-buy').attr('id');
		if(res<0){
			$('#msg').text('Not enough money');
		}
		else{
			$('#msg').text('You buy ' + name);
		}
		 
	});
	
});

</script>
@endsection