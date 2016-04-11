@extends('layouts.app')
 @section('title')
  Game
 @endsection
 @section('css')
 <link href="css/index.css" rel="stylesheet">
 @endsection
 
 @section('content')
 
 
	<div class="left pff">
		<h3>Latest News</h3>
		<span class = "time">2016/04/02 22:18</span>
		<p class = 'article'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here',</p>
		<span class = "time">2016/04/02 22:18</span>
		<p class = 'article'>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.</p>
		<span class = "time">2016/04/02 22:18</span>
		<p class = 'article'>Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
	</div>
	<div class="jumbotron pf">
		<div class="putsar-logo"><img src = "/images/logo2.png"></div>
	 	<h2 >Welcome {{Auth::user()->name}} </h2>
		<!-- <div class = "jumbotron pff"><h4>{{Auth::user()->name}} choose to play with:</h4>
		 <span id = "gun" ><img src = "#" class = "hidden-pic"></span>
		<span id = "granad"><img src = "#" class = "hidden-pic"></span>
		<span id = "armor"><img src = "#" class = "hidden-pic"></span> 
		
		</div>-->
		<div class = "jumbotron pff">
			<div><h4>My Guns</h4></div>
			 	<ul >
			 	@if($guns)
					@foreach($guns as $gun)	
					<li class= "float-left" ><a ><img src = "{{$gun->image}}"  id = "{{$gun->id}}"  ></a></li>
					@endforeach
					@endif
					
				</ul>
				<!-- <div>My Items</div> -->
		</div>
		<!-- 
		<div class = "jumbotron pff"><h4>My Granad</h4>
		@if(!isset($granades))
		@else
		<ul >	
					@foreach($granades as $granad)
					<li class= "float-left" ><a ><img src = "{{$granad->image}}"  id = "{{$granad->id}}"  ></a></li>
					@endforeach
				</ul>
				
		@endif
		</div> -->
		
		<div class = "jumbotron pff"><h4>My Armor</h4>
		@if(!isset($armors))
		@else
		<ul >	
					@foreach($armors as $armor)
					<li class= "float-left" ><a ><img src = "{{$armor->image}}"  id = "{{$armor->id}}"  ></a></li>
					@endforeach
				</ul>
				
		@endif
		</div>
	</div>	 	
 </div>	 		

 <!-- 
@section('script')

<script type="text/javascript">

var b = document.getElementsByClassName('hidden-pic')[0];
var d = document.getElementsByClassName('hidden-pic')[1];
var e = document.getElementsByClassName('hidden-pic')[2];
 var i;
function addGun(i){
	var a = document.getElementById(i);
	var c = a.getAttribute('src');
	b.style.display = 'inline-block';
	b.setAttribute("src", c);
}

function addGranad(i){
	var a = document.getElementById(i);
	var c = a.getAttribute('src');
	a.getAttribute('name', i);
	d.style.display = 'inline-block';
	d.setAttribute("src", c);
}

function addGranad(i){
	var a = document.getElementById(i);
	var c = a.getAttribute('src');
	a.getAttribute('name', i);
	e.style.display = 'inline-block';
	e.setAttribute("src", c);
}

 </script>
@stop
 
  -->
 @endsection
 