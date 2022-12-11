<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    use HasFactory;

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function group_member(){
        return $this->hasMany(GroupMember::class);
    }

    protected $fillable = [
        'name',
        'description',
        'display_picture',
        'status',
        'creator_id',
        'pin'
    ];
}
