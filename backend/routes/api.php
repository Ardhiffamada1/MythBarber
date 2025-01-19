<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\RegisterController;
use App\Http\Controllers\API\LoginController;
use App\Http\Controllers\API\LocationController;
use App\Http\Controllers\API\TreatmentController;
use App\Http\Controllers\API\TherapistController;
use App\Http\Controllers\API\AppointmentController;

// Rute untuk Register dan Login tidak memerlukan autentikasi
Route::post('register', [RegisterController::class, 'register'])->name('register');
Route::post('login', [LoginController::class, 'login'])->name('login');

// Rute yang membutuhkan autentikasi
Route::middleware('auth:sanctum')->group(function () {
    Route::get('locations', [LocationController::class, 'index']);
    Route::get('treatments', [TreatmentController::class, 'index']);
    Route::get('therapists', [TherapistController::class, 'index']);
    Route::post('appointments/check-slots', [AppointmentController::class, 'checkSlots']);
    Route::post('appointments', [AppointmentController::class, 'store']);
    Route::get('appointments/{id}', [AppointmentController::class, 'show']);
});

// Rute untuk membuat token (autentikasi diperlukan)
Route::middleware('auth:sanctum')->post('/tokens/create', function (Request $request) {
    $token = $request->user()->createToken($request->token_name);

    return ['token' => $token->plainTextToken];
});
