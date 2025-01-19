<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    protected $fillable = [
        'user_id', // Add this line
        // Other attributes you want to allow for mass assignment
    ];
}
