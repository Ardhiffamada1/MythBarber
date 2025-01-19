<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Therapist extends Model
{
    use HasFactory;

    // Definisikan nama tabel jika berbeda dari default
    protected $table = 'therapists';

    // Tentukan kolom yang dapat diisi
    protected $fillable = [
        'name',
        'specialization',
        'location_id', // Asumsi relasi dengan lokasi
    ];

    // Relasi dengan Location
    public function location()
    {
        return $this->belongsTo(Location::class);
    }

    // Relasi dengan Appointment
    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }
}
