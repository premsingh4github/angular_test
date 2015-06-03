<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', 'WelcomeController@index');
Route::get('/login','AuthenticateController@authenticate');
Route::get('/getUser','AuthenticateController@getAuthenticatedUser');
Route::post('/getUser','AuthenticateController@getAuthenticatedUser');
Route::resource('Auth','AuthenticateController');

Route::get('home', 'AuthenticateController@index');
Route::post('home', 'AuthenticateController@index');

Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',
]);
