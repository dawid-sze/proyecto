<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CancionesPost;
use App\Http\Requests\MensajePost;
use App\Models\Cancion;
use App\Models\Mensaje;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage; 

class CancionController extends Controller
{
    /**
     * Undocumented function
     *
     * @return void
     */
    public function index()
    {
        $canciones = Cancion::With(['discos.banda'])->get();
        return response()->json($canciones,202);
    }

    /**
     * Undocumented function
     *
     * @param CancionesPost $request
     * @return void
     */
    public function store(CancionesPost $request)
    {
        $archivoPath = null;

    if ($request->hasFile('cancion')) {

        $nombreArchivo = $request->file('cancion')->store('', 'repositorio_ficheros');


        $archivoPath = Storage::disk('repositorio_ficheros')->url($nombreArchivo);
    }


    $cancion = Cancion::create([
        'nombre_cancion' => $request->nombre_cancion,
        'cancion' => $archivoPath,
        'id_disco' => $request->id_disco,
        'reproducciones' => 0

    ]);

    return response()->json($cancion, 201);
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
        $cancion = Cancion::findOrFail($id);

        $cancion->delete();
        
        return response()->json($cancion, 201);
    }
/**
 * Undocumented function
 *
 * @param string $generoId
 * @return void
 */
public function cancionesPorGeneroRecomendacion(string $generoId)
{
    $canciones = Cancion::with([
            'disco.grupo',
            'comentarios.emisor'
        ])
        ->whereHas('disco', function ($query) use ($generoId) {
            $query->where('id_genero', $generoId);
        })
        ->inRandomOrder()
        ->limit(5)
        ->get();

    return response()->json($canciones, 200);
}
/**
 * Undocumented function
 *
 * @param string $generoId
 * @return void
 */
public function cancionesPorGenero(string $generoId)
{
    $canciones = Cancion::with(['disco.grupo', 'comentarios.emisor'])
        ->whereHas('disco', function ($query) use ($generoId) {
            $query->where('id_genero', $generoId);
        })
        ->get();

    return response()->json($canciones, 200);
}
/**
 * Undocumented function
 *
 * @return void
 */
public function cancionesAleatorias()
{
    $canciones = Cancion::with([
            'disco.grupo',
            'comentarios.emisor'
        ])
        ->inRandomOrder()
        ->limit(5)
        ->get();

    return response()->json($canciones, 200);
}
/**
 * Undocumented function
 *
 * @param string $id
 * @return void
 */
public function aumentarReproducciones(string $id){
    $cancion = Cancion::findOrFail($id);

    $cancion->increment('reproducciones');

    return response()->json([
        'status' => 'ok',
        'reproducciones' => $cancion->reproducciones
    ]);
}
/**
 * Undocumented function
 *
 * @return void
 */
public function reproduccionesPorGenero()
{
    $data = Cancion::join('discos', 'canciones.id_disco', '=', 'discos.id')
        ->join('generos', 'discos.id_genero', '=', 'generos.id')
        ->select(
            'generos.nombre_genero as genero',
            DB::raw('SUM(canciones.reproducciones) as total_reproducciones')
        )
        ->groupBy('generos.nombre_genero')
        ->get();

    return response()->json($data, 200);
}
/**
 * Undocumented function
 *
 * @param MensajePost $request
 * @param string $id_cancion
 * @return void
 */
public function comentar(MensajePost $request, string $id_cancion)
{
    $user = auth()->user();

    try {
        $mensaje = Mensaje::create([
            'contenido' => $request->contenido,
            'id_emisor' => $user->id,
            'id_cancion' => $id_cancion,
        ]);

        return response()->json([
            'message' => 'Comentario creado correctamente',
            'data' => $mensaje
        ], 201);

    } catch (\Exception $e) {
        return response()->json([
            'error' => 'No se pudo crear el comentario',
            'details' => $e->getMessage()
        ], 500);
    }
}
}
