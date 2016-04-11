  @extends('layouts.app')
 @section('title')
  Magazine 
 @endsection
 @section('css')
 <link href="css/magazine.css" rel="stylesheet">
 @endsection
 
 @section('content')

 <div class="mag">
	 <ul id= "double" class = " jumbotron pff">
	 
		 @foreach($items as $item)
			 @if($item->payed == 0 && $item->id > 2 && $item->id < 10 )

 		<div id = "successful-buy"></div>
		 <input type="hidden" name="_token" value="{{ csrf_token() }}" class = 'tkn'>
		 <!-- <input type= "hidden" name = "item_id" value = "{{$item->id}}" class="id">  -->
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
						 <button id="{{$item->id}}" class = "btn btn-primary btn-lg btn-buy {{$item->price}}" name = "{{$item->name}}">Buy</button>
					 	</div>
				 </div>
				 </li>	 
			 @endif
			 
		 @endforeach
	 </ul>
 </div >
 @endsection
 @section('script')
 <script type="text/javascript" src = "https://code.jquery.com/jquery-2.1.4.min.js"></script>
<script type="text/javascript">
$.ajaxSetup({  
	headers: { 
		 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') 
		                 }  
		              });

$( document ).ready(function(){
	$( '.btn-buy' ).click(function(e){
		buy( $( this ) . attr( 'id' ), $(this).attr('name') );
	});
	function buy( item_id, name ){
		$.get( "/magazine/{{$item->id}}" , { 'item_id':item_id }).done(function(response){
				$('#text').html('You buy' + name);
				refreshPlayerMoney();
			});
		}
});

function refreshPlayerMoney(){

var money = '50';
	
	$('li#sp1').html('Money' + money);
	
}
	
	
 </script>
 @endsection