<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    use HasFactory;

    // Definisikan nama tabel jika berbeda dari default
    protected $table = 'locations';

    // Tentukan kolom yang dapat diisi
    protected $fillable = [
        'name',
        'address',
        'phone_number',
        'email',
    ];

    // Relasi dengan Therapist
    public function therapists()
    {
        return $this->hasMany(Therapist::class);
    }

    // Relasi dengan Appointment
    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }
}
