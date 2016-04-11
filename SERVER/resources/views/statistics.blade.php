@extends('layouts.app')
 @section('title')
  Statistics 
 @endsection
 
 @section('css')
 <link href="css/statistic.css" rel="stylesheet">
 @endsection
 	@section('a')
 	{{$i=1}}
 	@endsection
 @section('content')
<div id="tab">
 <table class="table table-inverse table-hover cust">
 	<thead>
 	<tr>
 		<th>#</th>
 		<th>Palayer</th>
 		<th>Kills</th>
 		<th>Score</th>
 		<th>Games</th>
 		</tr>
 	</thead>
 	<tbody>
 
 	@foreach($sorts as $sort)
 	<tr>
 		<td>{{(($sorts->currentPage() - 1 ) * $sorts->perPage() + $i++ )}}</td>
 		<td>{{$sort->user->name}}</td>
 		<td>{{$sort->kills}}</td>
 		<td>{{$sort->score}}</td>
 		<td>{{$sort->game_played}}</td>
 	</tr>
 	@endforeach
 	
 	
 	</tbody>
 
 </table>

 <div id = "pag">
 {!! $sorts->render() !!}
 </div>
  </div>
 @endsection