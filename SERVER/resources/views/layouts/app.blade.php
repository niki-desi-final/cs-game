<!DOCTYPE html>
<html lang="en">
<head>
<meta name="csrf-token" content="{{ csrf_token() }}" /> 
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>Laravel</title>

<!-- Fonts -->
<link
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.min.css"
	rel='stylesheet' type='text/css'>
<link
	href="https://fonts.googleapis.com/css?family=Lato:100,300,400,700"
	rel='stylesheet' type='text/css'>

<link href = "https://bootswatch.com/slate/bootstrap.min.css" rel = "stylesheet">

<link href="css/app.css" rel="stylesheet">
@yield('css')


<style>
body {
	font-family: 'Lato';
}

.fa-btn {
	margin-right: 6px;
}
</style>
</head>
<body id="app-layout">
	<nav class="navbar-fixed-top navbar navbar-default navbar-static-top  ">
		<div class="container">
			<div class="navbar-header">

				<!-- Collapsed Hamburger -->
				<button type="button" class="navbar-toggle collapsed"
					data-toggle="collapse" data-target="#app-navbar-collapse">
					<span class="sr-only">Toggle Navigation</span> <span
						class="icon-bar"></span> <span class="icon-bar"></span> <span
						class="icon-bar"></span>
				</button>
			</div>

			<div class="collapse navbar-collapse" id="app-navbar-collapse">
				<!-- Left Side Of Navbar -->
				<ul class="nav navbar-nav">
					<li><a href="{{ url('/home') }}">Home</a></li>
					@if(Auth::user())
					<li><a href="/magazine">Store</a></li>
					<!-- <li><a href="/magazine">Community</a></li> -->
					<li class="dropdown">
			          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Statistics <span class="caret"></span></a>
			          <ul class="dropdown-menu" role="menu">
			            <li><a href="/statisticKills">Kills</a></li>
			            <li><a href="/statisticScore">Score</a></li>
			            <li><a href="/statisticGame">Game</a></li>
			           <!--  <li><a href="/myStatistics">Player</a></li> -->
			          </ul>
			        </li>
					<li class = "sp" id="sp1">Money: {{$data->money}}</li>
					<li class = "sp" id="sp2">Score: {{$data->score}}</li>
					<li class = "sp" id="sp3">Played games: {{$data->game_played}}</li>
					
					@endif
				</ul>			
				<!-- Right Side Of Navbar -->
				<ul class="nav navbar-nav navbar-right">
					<!-- Authentication Links -->
					@if (Auth::guest())
					<li><a href="{{ url('/login') }}">Login</a></li>
					<li><a href="{{ url('/register') }}">Register</a></li> @else
					<li class="dropdown"><a href="#" class="dropdown-toggle"
						data-toggle="dropdown" role="button" aria-expanded="false"> {{
							Auth::user()->name }} <span class="caret"></span>
					</a>
						<ul class="dropdown-menu" role="menu">
							<li><a href="{{ url('/logout') }}"><i
									class="fa fa-btn fa-sign-out"></i>Logout</a></li>
						</ul></li> @endif
				<li class= "play"><a href="/play">Play</a></li>
				</ul>
				
			</div>
		</div>
	</nav>
	
</div>
	<div id = "container">
	@yield('content')
	
	@yield('script')
	
	<!-- JavaScripts -->
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
	<script
		src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
	{{--
	<script src="{{ elixir('js/app.js') }}"></script>
	--}}
	</div>
</body>
</html>
