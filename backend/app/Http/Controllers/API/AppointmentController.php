<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Response;

class AppointmentController extends Controller
{
    /**
     * Check available slots for appointments.
     */
    public function checkSlots(Request $request)
    {
        // Validate incoming request
        $validator = Validator::make($request->all(), [
            'location_id' => 'required|exists:locations,id',
            'treatment_id' => 'required|exists:treatments,id',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), Response::HTTP_BAD_REQUEST);
        }

        // Logic to check available slots
        $appointments = Appointment::where('location_id', $request->location_id)
            ->where('treatment_id', $request->treatment_id)
            ->where('appointment_time', '>=', now()->toDateTimeString())
            ->get();

        return response()->json($appointments);
    }

    /**
     * Store a new appointment.
     */
    public function store(Request $request)
    {
        
        $validator = Validator::make($request->all(), [
            'location_id' => 'required|exists:locations,id',
            'therapist_id' => 'required|exists:therapists,id',
            'treatment_id' => 'required|exists:treatments,id',
            'appointment_time' => 'required|date_format:Y-m-d H:i:s|after:now',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), Response::HTTP_BAD_REQUEST);
        }

        $user = $request->user();
        if (!$user) {
            return response()->json(['error' => 'User tidak ada akses'], Response::HTTP_UNAUTHORIZED);
        }

        // Buat appointment
        $appointment = Appointment::create([
            'user_id' => $user->id,
            'location_id' => $request->location_id,
            'therapist_id' => $request->therapist_id,
            'treatment_id' => $request->treatment_id,
            'appointment_time' => $request->appointment_time,
        ]);

        return response()->json($appointment, Response::HTTP_CREATED);
    }

    /**
     * Show a specific appointment by ID.
     */
    public function show($id)
    {
        $appointment = Appointment::find($id);
        if (!$appointment) {
            return response()->json(['error' => 'Appointment not found'], Response::HTTP_NOT_FOUND);
        }

        return response()->json($appointment);
    }
}
