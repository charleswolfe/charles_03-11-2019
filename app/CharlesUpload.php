<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CharlesUpload extends Model
{
    use Uuids;

    protected $table = "charles_uploads";

    protected $fillable = ['id','storage_path', 'resource_file_name', 'label_file_name'];

    protected $hidden = [
        'storage_path',
        'resource_file_name',
    ];

    public $incrementing = false;
}
