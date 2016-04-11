@extends('layouts.app')
@section('content')

@section('css')
<link href="css/welcome.css" rel="stylesheet">
 @endsection
 
<div class="container">
	
		<div class="col-md-10 col-md-offset-1">
			<div >
				<div class="panel-body">
				
					<div class="putsar-wellcomepage"><img src = "/images/logo2.png"></div>
					<div id = "play-div"><a class="btn btn-primary btn-lg play-btn" href = "/login" role = "button">Play</a></div>
 				</div>
			</div>
		</div>

</div>
	
@endsection
