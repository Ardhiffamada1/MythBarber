<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Cek kredensial pengguna
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            // Ambil user yang sudah berhasil login
            $user = Auth::user();

            if ($user) {
                // Generate token API menggunakan Sanctum
                $token = $user->createToken('YourAppName')->plainTextToken;

                return response()->json([
                    'message' => 'Login successful',
                    'user' => $user,
                    'token' => $token
                ]);
            } else {
                return response()->json(['message' => 'User not found'], 404);
            }
        }

        // Jika login gagal
        throw ValidationException::withMessages([
            'email' => ['These credentials do not match our records.'],
        ]);
    }
}
