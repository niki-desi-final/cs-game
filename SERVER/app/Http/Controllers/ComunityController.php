<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class ComunityController extends Controller
{
    public function index()
    {
    	$data = \App\Data_user::find(\Auth::user()->id);
    	return view('comunity')->with('data', $data);
    }
}
