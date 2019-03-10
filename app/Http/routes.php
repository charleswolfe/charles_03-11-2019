<?php

use Illuminate\Http\Request;
use App\User;
use Tymon\JWTAuth\Facades\JWTAuth;

/*
|--------------------------------------------------------------------------
| Application Routes |--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.  |
It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::group(['middleware' => ['web']], function () {
    Route::get('/', function () {
        return view('welcome');
    });
});

Route::group(['prefix' => 'api', 'middleware' => ['cors', 'web']], function () {
    Route::get('charles_uploads/{id}/download', 'CharlesUploadController@download');
    Route::post('charles_uploads/{id}/replace', 'CharlesUploadController@replace');
    Route::resource('charles_uploads', 'CharlesUploadController');
});
