<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Auth\RememberMe as RememberToken;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
//    use RememberToken;

    public function like(){
        return $this->hasMany(Like::class);
    }

    public function friendship(){
        return $this->hasMany(Friendship::class);
    }

    public function feedback(){
        return $this->hasMany(Feedback::class);
    }

    public function group(){
        return $this->hasMany(Group::class);
    }

    public function group_member(){
        return $this->hasMany(GroupMember::class);
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'last_name',
        'username',
        'profile_picture',
        'cover_picture',
        'is_admin',
        'is_banned'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
