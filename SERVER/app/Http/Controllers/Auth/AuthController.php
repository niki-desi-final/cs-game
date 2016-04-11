<?php

namespace App\Http\Controllers\Auth;


use Auth;
use Socialite;
use App\User;
use Carbon\Carbon;
use Validator;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;

class AuthController extends Controller {
	/*
	 * |--------------------------------------------------------------------------
	 * | Registration & Login Controller
	 * |--------------------------------------------------------------------------
	 * |
	 * | This controller handles the registration of new users, as well as the
	 * | authentication of existing users. By default, this controller uses
	 * | a simple trait to add these behaviors. Why don't you explore it?
	 * |
	 */
	
	use AuthenticatesAndRegistersUsers, ThrottlesLogins;
	
	/**
	 * Where to redirect users after login / registration.
	 *
	 * @var string
	 */
	protected $redirectTo = '/';
	
	/**
	 * Create a new authentication controller instance.
	 *
	 * @return void
	 */
	public function __construct() {
		$this->middleware ( $this->guestMiddleware (), [ 
				'except' => 'logout' 
		] );
	}
	
	/**
	 * Get a validator for an incoming registration request.
	 *
	 * @param array $data        	
	 * @return \Illuminate\Contracts\Validation\Validator
	 */
	protected function validator(array $data) {
		return Validator::make ( $data, [ 
				'name' => 'required|max:255',
				'email' => 'required|email|max:255|unique:users',
				'password' => 'required|min:6|confirmed' 
		] );
	}
	
	/**
	 * Create a new user instance after a valid registration.
	 *
	 * @param array $data        	
	 * @return User
	 */
	protected function create(array $data) {
	
		$user = User::create([
				'name' => $data['name'],
				'email' => $data['email'],
				'password' => bcrypt($data['password']),
		]);
		
		$dataUser = \App\Data_user::create([
				'user_id'=>$user->id,
				'money' => '500',
				'score' =>'0',
				'health'=> '50',
				'game_played'=>'0',
				'kills'=> '0',
				'created_at'=>Carbon::now(),
				'updted_at'=>Carbon::now()
		]);
		
		\App\Data_user_item::create([
			'data_user_id'	=> $dataUser->id,
			'item_id' => '1',
			'quantity' => '1'
		]);
		
		
		return $user;
		
	}
	
	protected $redirectPath = '/';
	
	/**
	 * Redirect the user to the Facebook authentication page.
	 *
	 * @return Response
	 */
	public function redirectToProvider()
	{
		return Socialite::driver('facebook')->redirect();
	}
	
	/**
	 * Obtain the user information from Facebook.
	 *
	 * @return Response
	 */
	public function handleProviderCallback()
	{
		try {
			$user = Socialite::driver('facebook')->user();
		} catch (Exception $e) {
			return redirect('auth/facebook');
		}
	
		$authUser = $this->findOrCreateUser($user);
	
		Auth::login($authUser, true);
	
		return redirect()->action('ProfileController@index');;
	}
	
	/**
	 * Return user if exists; create and return if doesn't
	 *
	 * @param $facebookUser
	 * @return User
	 */
	private function findOrCreateUser($facebookUser)
	{
		$authUser = User::where('facebook_id', $facebookUser->id)->first();
	
		if ($authUser){
			return $authUser;
		}
		else{
	
		$user =  User::create([
				'name' => $facebookUser->name,
				'email' => $facebookUser->email,
				'facebook_id' => $facebookUser->id,
				
		]);
		
		$dataUser = \App\Data_user::create([
				'user_id'=>$user->id,
				'money' => '500',
				'score' =>'0',
				'health'=> '50',
				'game_played'=>'0',
				'kills'=> '0',
				'created_at'=>Carbon::now(),
				'updted_at'=>Carbon::now()
		]);
		
		\App\Data_user_item::create([
				'data_user_id'	=> $dataUser->id,
				'item_id' => '1',
				'quantity' => '1'
		]);
		}
		return $user;
	}
}
