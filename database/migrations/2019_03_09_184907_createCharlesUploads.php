<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCharlesUploads extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('charles_uploads', function (Blueprint $table) {
            $table->uuid('id');
            $table->string('storage_path');
            $table->string('resource_file_name');
            $table->string('mime_type')->nullable();
            $table->string('label_file_name');
            $table->timestamps();
            $table->primary('id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('charles_uploads');
    }
}