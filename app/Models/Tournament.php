<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tournament extends Model
{
    use HasFactory;

    public function categories(){

        return $this->belongsToMany(Category::class);
    }

    public function teams(){

        return $this->belongsToMany(Team::class);
    }

    protected $hidden=['pivot'];
    protected $fillable=['name'];
}

