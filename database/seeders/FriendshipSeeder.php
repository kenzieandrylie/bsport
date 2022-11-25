<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FriendshipSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('friendships')->insert([
            'following_id' => "2",
            'follower_id' => "1"
        ]);
        DB::table('friendships')->insert([
            'following_id' => "3",
            'follower_id' => "1"
        ]);
        DB::table('friendships')->insert([
            'following_id' => "1",
            'follower_id' => "2"
        ]);
    }
}
