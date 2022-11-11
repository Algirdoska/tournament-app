<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\TournamentController;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//   Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//      return $request->user();
//   });

// Route::group(['middleware' => 'auth:api'], function () {});

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');

});

    Route::apiResources([
        "categories"=>CategoryController::class,
        "tournaments"=>TournamentController::class,
        "teams"=>TeamController::class
    ]);


    // Route::group([

    //     'middleware' => 'api',
    //     'prefix' => 'auth'

    // ], function ($router) {

    //     Route::post('adminregister',[App\Http\Controllers\AdminController::class, 'adminregister'])->name('adminregister');
    //     Route::post('adminlogin',[App\Http\Controllers\AdminController::class, 'adminlogin'])->name('adminlogin');
    //     Route::post('adminlogout',[App\Http\Controllers\AdminController::class, 'adminlogout'])->name('adminlogout');
    //     Route::post('me',[App\Http\Controllers\AdminController::class, 'me'] );

    // });
