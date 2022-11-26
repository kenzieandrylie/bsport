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
            'username' => 'bluedrinkers',
            'email' => 'bluedrinkers@gmail.com',
            'password' => Hash::make('lyzander1')
        ]);
        DB::table('users')->insert([
            'name' => 'Peki',
            'last_name' => 'Anto',
            'username' => 'pekianto',
            'email' => 'peki@gmail.com',
            'password' => Hash::make('lyzander1')
        ]);
        DB::table('users')->insert([
            'name' => 'Kenzie',
            'last_name' => 'Andrylie',
            'username' => 'kenzieandrylie',
            'email' => 'kenzie@gmail.com',
            'password' => Hash::make('lyzander1')
        ]);
        DB::table('users')->insert([
            'name' => 'Davin',
            'last_name' => 'Haryadi',
            'username' => 'davinharyadi',
            'email' => 'davin@gmail.com',
            'password' => Hash::make('lyzander1')
        ]);
    }
}
