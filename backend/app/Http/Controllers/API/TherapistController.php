<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Therapist;
use Illuminate\Http\Request;

class TherapistController extends Controller
{
    public function index(Request $request)
    {
        $therapists = Therapist::where('treatment_id', $request->treatment_id)->get();
        return response()->json($therapists);
    }
}
