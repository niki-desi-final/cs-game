@extends('layouts.app')
@section('title')
  Game
 @endsection
 @section('css')
 <link href="css/comunity.css" rel="stylesheet">
 @endsection
 
 @section('content')
 
 <div class="jumbotron pf">
 <div>Best players for today</div>
 <div class="jumbotron box">Top Score</div>
 <div class="jumbotron box">Top games</div>
 <div class="jumbotron box">Top killers</div>
 </div>
 
 <div class="jumbotron pf">
 <div>Best players for week</div>
 <div class="jumbotron box">Top Score</div>
 <div class="jumbotron box">Top games</div>
 <div class="jumbotron box">Top killers</div>
 </div>
 
 <div class="jumbotron pf">
 <div>Best players for month</div>
 <div class="jumbotron box">Top Score</div>
 <div class="jumbotron box">Top games</div>
 <div class="jumbotron box">Top killers</div>
 </div>
 
 @endsection