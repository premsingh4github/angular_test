<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Response;
class AuthenticateController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	protected $request;

    public function __construct(Request $request) {
        $this->request = $request;
	}
	public function authenticate(Request $request)
	    {
	        // grab credentials from the request
	        
	        $credentials = $request->only('email', 'password');

	        try {
	            // attempt to verify the credentials and create a token for the user
	            if (! $token = JWTAuth::attempt($credentials)) {
	                return response()->json(['error' => 'invalid_credentials'], 401);
	            }
	        } catch (JWTException $e) {
	            // something went wrong whilst attempting to encode the token
	            return response()->json(['error' => 'could_not_create_token'], 500);
	        }

	        // all good so return the token
	        return response()->json(compact('token'));
	    }
	public function getAuthenticatedUser(Request $request)
	{
		$method = $this->request->method();
		//print_r( $this->request->only('email','password'));
	    try {

	        if (! $user = JWTAuth::parseToken()->authenticate()) {
	            return response()->json(['user_not_found'], 404);
	        }

	    } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

	        return response()->json(['token_expired'], $e->getStatusCode());

	    } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

	        return response()->json(['token_invalid'], $e->getStatusCode());

	    } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {

	        return response()->json(['token_absent'], $e->getStatusCode());

	    }

	    // the token is valid and we have found the user via the sub claim
	    return response()->json(compact('user'));
	}
	public function index()
	{
		print_r($this->request->all());
		return "ok";
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		//
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		//
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		//
	}

}
