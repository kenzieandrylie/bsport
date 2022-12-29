<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function group_activity(){
        return $this->belongsTo(GroupActivity::class);
    }

    protected $fillable = [
        'group_activity_id',
        'user_id',
        'body'
    ];
}
