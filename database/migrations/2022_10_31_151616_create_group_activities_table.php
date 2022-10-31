<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('group_activities', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('group_member_id');
            $table->foreign('group_member_id')->references('id')->on('group_members')->onDelete('cascade')->onUpdate('cascade');
            $table->unsignedBigInteger('activity_id');
            $table->foreign('activity_id')->references('id')->on('activities')->onDelete('cascade')->onUpdate('cascade');
            $table->unsignedBigInteger('distance');
            $table->unsignedBigInteger('step');
            $table->unsignedBigInteger('time');
            $table->unsignedBigInteger('calories');
            $table->date('activity_date');
            $table->string('activity_picture');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('group_activities');
    }
};
