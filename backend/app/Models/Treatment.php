<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Treatment extends Model
{
    use HasFactory;

    // Definisikan nama tabel jika berbeda dari default
    protected $table = 'treatments';

    // Tentukan kolom yang dapat diisi
    protected $fillable = [
        'name',
        'description',
        'duration', // durasi perawatan dalam menit
        'price', // harga perawatan
    ];

    // Relasi dengan Appointment
    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }
}
