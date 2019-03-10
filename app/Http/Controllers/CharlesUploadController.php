<?php

namespace App\Http\Controllers;

use App\CharlesUpload;
use Illuminate\Http\Request;

use App\Http\Requests;

class CharlesUploadController extends Controller
{


    public function index()
    {
        $charles_files = CharlesUpload::all();
        return response()->json($charles_files, 200);
    }

    public function store(Request $request)
    {

        $data = $this->validate($request,
            [
                'file' => 'required'
            ]
        );


        $original_file_name = substr(htmlspecialchars($request->file('file')->getClientOriginalName()), 0, 255);
        $path = storage_path('/charles_uploads/');
        $filename = strrev(md5(random_bytes(10)));

        if ($request->file('file')->move($path, $filename)) {

            $charles_file = CharlesUpload::create([
                'storage_path' => $path,
                'resource_file_name' => $filename,
                'mime_type' => 'na', //$request->file('file')->getMimeType() ?: 'na'
                'label_file_name' => $original_file_name,
            ]);

            return response()->json([$charles_file], 200);
        }
        return response()->json($data, 500);
    }

    public function replace(Request $request, $id)
    {

        $data = $this->validate($request,
            [
                'file' => 'required'
            ]
        );

        $original_file_name = substr(htmlspecialchars($request->file('file')->getClientOriginalName()), 0, 255);
        $path = storage_path('/charles_uploads/');
        $charles_file = CharlesUpload::findOrFail($id);
        $filename = $charles_file->resource_file_name;

        if ($request->file('file')->move($path, $filename)) {
            $charles_file->mime_type = 'na';
            $charles_file->label_file_name = $original_file_name;
            $charles_file->save();
            return response()->json([$charles_file], 200);
        }
        return response()->json($data, 500);
    }

    public function show ($id){
        $charles_file = CharlesUpload::find($id);
        return response()->json($charles_file, 200);
    }

    public function download ($id){
        $charles_file = CharlesUpload::findOrFail($id);
        $file_path = $charles_file->storage_path . $charles_file->resource_file_name;
        $output_name = htmlspecialchars($charles_file->label_file_name);
        $headers = [];
        return response()->download($file_path, $output_name, $headers);
    }

    public function destroy($id)
    {
        $charles_file = CharlesUpload::find($id);

        $filename = $charles_file->storage_path . $charles_file->resource_file_name; //todo security risk

        if (file_exists($filename)) {
            unlink($filename);
        }
        $charles_file->delete();
        
        return response()->json("DELETED", 200);
    }
}
