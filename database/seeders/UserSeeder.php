<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('users')->insert([
            'name' => 'bluedrinkers',
            'last_name' => 'Aja',
            'kode' => '2301911060',
            'email' => 'bluedrinkers@gmail.com',
            'password' => Hash::make('lyzander1')
        ]);
        DB::table('users')->insert([
            'name' => 'Peki',
            'last_name' => 'Anto',
            'kode' => 'D5558',
            'email' => 'peki@gmail.com',
            'password' => Hash::make('lyzander1')
        ]);
        DB::table('users')->insert([
            'name' => 'Kenzie',
            'last_name' => 'Andrylie',
            'kode' => 'D5578',
            'email' => 'kenzie@gmail.com',
            'password' => Hash::make('lyzander1')
        ]);
        DB::table('users')->insert([
            'name' => 'Davin',
            'last_name' => 'Haryadi',
            'kode' => 'D4444',
            'email' => 'davin@gmail.com',
            'password' => Hash::make('lyzander1')
        ]);
    }
}
