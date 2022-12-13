<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GroupActivitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('group_activities')->insert([
            'group_member_id' => 5,
            'activity_id' => 2,
            'distance' => 12,
            'calories' => 40,
            'activity_date' => '2022-12-01',
            'activity_picture' => 'fitnesspeople.png',
            'caption' => 'bersepeda di pagi hari'
        ]);
        DB::table('group_activities')->insert([
            'group_member_id' => 5,
            'activity_id' => 3,
            'time' => 45,
            'calories' => 70,
            'activity_date' => '2022-12-02',
            'activity_picture' => 'fitnesspeople2.png',
            'caption' => 'workout di silvergym'
        ]);
        DB::table('group_activities')->insert([
            'group_member_id' => 1,
            'activity_id' => 2,
            'distance' => 14,
            'calories' => 47,
            'activity_date' => '2022-12-04',
            'activity_picture' => 'fitnesspeople.png',
            'caption' => 'peki sedang bersepeda'
        ]);
        DB::table('group_activities')->insert([
            'group_member_id' => 6,
            'activity_id' => 1,
            'distance' => 8,
            'step' => 200,
            'calories' => 50,
            'activity_date' => '2022-12-05',
            'activity_picture' => 'fitnesspeople.png',
            'caption' => 'jalan jalan dlu bos'
        ]);

    }
}
