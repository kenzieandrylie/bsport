<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class GroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('groups')->insert([
            'creator_id' => "2",
            'name' => 'Kalangan Elit',
            'description' => 'Grup olahraga umum males bikin deskripsi'
        ]);
        DB::table('groups')->insert([
            'creator_id' => "2",
            'name' => 'Grup Anak Muda',
            'description' => 'Grup olahraga umum untuk mahasiswa'
        ]);
        DB::table('groups')->insert([
            'creator_id' => "2",
            'name' => 'Berkibarlah Bendera',
            'description' => 'Grup olahraga umum nasionalisme'
        ]);
    }
}
