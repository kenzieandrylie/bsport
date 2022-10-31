<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    use HasFactory;

    public function group_activity(){
        return $this->hasMany(GroupActivity::class);
    }

    protected $fillable = [
        'name'
    ];
}
