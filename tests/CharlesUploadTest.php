<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

use App\CharlesUploads;

class CharlesUploadsTest extends TestCase
{
    use DatabaseTransactions;


    public function test_upload_file()
    {
        $headers = [];
        $response = $this
            ->post("api/charles_uploads", ['file' => ''], $headers);
        $response->assertStatus(200);

    }

    public function test_get_file_list()
    {
        $response = $this
            ->get("api/charles_uploads");

        $response->assertStatus(200);

    }

    public function test_download_file()
    {
        $original_file_name = 'test_document_1.txt';
        $path = storage_path('/charles_uploads/');
        $filename = strrev(md5(random_bytes(10)));
        //todo make the actual file

        $charles_file = CharlesUpload::create([
            'storage_path' => $path,
            'resource_file_name' => $filename,
            'mime_type' => 'na',
            'label_file_name' => $original_file_name,
        ]);

        $response = $this
            ->get("api/charles_uploads/{$charles_file->id}");

        $response->assertStatus(200);

    }
}
