<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\DiscosPost;
use App\Models\Disco;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DiscoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

   /**
    * Undocumented function
    *
    * @param DiscosPost $request
    * @return void
    */
    public function store(DiscosPost $request)
    {
        $archivoPath = null;
    if ($request->hasFile('portada')) {

        $nombreArchivo = $request->file('portada')->store('', 'repositorio_ficheros');

        $archivoPath = Storage::disk('repositorio_ficheros')->url($nombreArchivo);
    }
            $disco = Disco::create([
            'nombre' => $request->nombre,
            'id_genero' => $request->id_genero,
            'portada' => $archivoPath,
            'id_grupo' => auth()->user()->id,

        ]);

        return response()->json($disco, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Undocumented function
     *
     * @param string $id
     * @return void
     */
    public function destroy(string $id)
    {
        $disco = Disco::findOrFail($id);

        $disco->delete();
        
        return response()->json($disco, 201);
    }
}
