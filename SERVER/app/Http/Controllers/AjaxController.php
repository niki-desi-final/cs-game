<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class AjaxController extends Controller
{
    public function navbarRefresh()
    {
    	$user= \Auth::user();
    	return $user->data_user;
    }
}
