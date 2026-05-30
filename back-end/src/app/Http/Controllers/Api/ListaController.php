<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ListasPost;
use App\Models\Cancion;
use App\Models\Lista;
use Illuminate\Http\Request;

class ListaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
    }

    /**
     * Undocumented function
     *
     * @param ListasPost $request
     * @return void
     */
    public function store(ListasPost $request)
    {
            $lista = Lista::create([
            'nombre_lista' => $request->nombre_lista,
            'id_propietario' => auth()->user()->id
        ]);

        return response()->json($lista, 201);
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
        $lista = Lista::findOrFail($id);

        $lista->delete();
        
        return response()->json($lista, 201);
    }

/**
 * Undocumented function
 *
 * @param string $lista_id
 * @param string $cancion_id
 * @return void
 */
    public function aniadirCancion(string $lista_id, string $cancion_id)
{
    $cancion = Cancion::findOrFail($cancion_id);
    $lista = Lista::findOrFail($lista_id);

    $lista->canciones()->syncWithoutDetaching([$cancion_id]);

    return response()->json([
        'status' => 'Inserción realizada correctamente'
    ]);
}
/**
 * Undocumented function
 *
 * @param string $lista_id
 * @param string $cancion_id
 * @return void
 */
public function eliminarCancionDeLista(string $lista_id, string $cancion_id)
{
    $cancion = Cancion::findOrFail($cancion_id);
    $lista = Lista::findOrFail($lista_id);

    if (!$lista->canciones()->where('cancion_id', $cancion_id)->exists()) {
        return response()->json([
            'status' => 'La canción no está en la lista'
        ], 404);
    }

    $lista->canciones()->detach($cancion_id);

    return response()->json([
        'status' => 'Canción eliminada de la lista correctamente'
    ], 201);
}

}
