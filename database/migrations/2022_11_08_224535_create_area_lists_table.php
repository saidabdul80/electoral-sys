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
        Schema::create('area_lists', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->bigInteger('state_id');
            $table->bigInteger('lga_id');
            $table->bigInteger('ward_id');            
            $table->text('description');            
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
        Schema::dropIfExists('area_lists');
    }
};
