<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GroupMemberSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        // creator auto jadi member
        DB::table('group_members')->insert([
            'group_id' => "1",
            'user_id' => "2"
        ]);
        DB::table('group_members')->insert([
            'group_id' => "2",
            'user_id' => "2"
        ]);
        DB::table('group_members')->insert([
            'group_id' => "3",
            'user_id' => "2"
        ]);
        // user yang udah join misalkan
        DB::table('group_members')->insert([
            'group_id' => "1",
            'user_id' => "1"
        ]);
        DB::table('group_members')->insert([
            'group_id' => "2",
            'user_id' => "1"
        ]);
    }
}
