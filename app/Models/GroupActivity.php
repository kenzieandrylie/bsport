<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GroupActivity extends Model
{
    use HasFactory;

    public function group_member(){
        return $this->belongsTo(GroupMember::class);
    }

    public function activity(){
        return $this->belongsTo(Activity::class);
    }

    protected $fillable = [
        'group_member_id',
        'activity_id',
        'distance',
        'step',
        'time',
        'calories',
        'activity_date',
        'acitivity_picture'
    ];
}
