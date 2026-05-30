<?php

use App\Http\Controllers\Api\BandaController;
use App\Http\Controllers\Api\CancionController;
use App\Http\Controllers\Api\ChatController;
use App\Http\Controllers\Api\DiscoController;
use App\Http\Controllers\Api\ListaController;
use App\Http\Controllers\Api\PaisController;
use App\Http\Controllers\Api\TarjetaBancariaController;
use App\Http\Controllers\Api\UsuarioApiController;
use App\Http\Controllers\GeneroController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->post('/logout', [UsuarioApiController::class, 'logOut']);
Route::middleware('auth:sanctum')->get('/usuario',[UsuarioApiController::class, 'usuario']);
Route::middleware('auth:sanctum')->post('/reproducciones/{id}', [UsuarioApiController::class, 'reproducciones']);
Route::middleware('auth:sanctum')->post('/aumentarReproducciones/{id}', [CancionController::class, 'aumentarReproducciones']);
Route::middleware('auth:sanctum')->post('/aniadirCancion/{lista_id}/{cancion_id}',[ListaController::class, 'aniadirCancion']);
Route::middleware('auth:sanctum')->delete('/eliminarCancionDeLista/{lista_id}/{cancion_id}',[ListaController::class, 'eliminarCancionDeLista']);
Route::middleware('auth:sanctum')->post('/suscribirse',[UsuarioApiController::class, 'suscribirse']);
Route::middleware('auth:sanctum')->post('/desuscribirse',[UsuarioApiController::class, 'desuscribirse']);
Route::middleware('auth:sanctum')->post('/reproduccionesPorGenero',[CancionController::class, 'reproduccionesPorGenero']);
Route::middleware('auth:sanctum')->post('/comentar/{id}',[CancionController::class, 'comentar']);
Route::middleware('auth:sanctum')->post('/likear_cancion/{id}',[UsuarioApiController::class, 'likear_cancion']);
Route::middleware('auth:sanctum')->post('/deslikear_cancion/{id}',[UsuarioApiController::class, 'deslikear_cancion']);


Route::apiResource('/usuarios',UsuarioApiController::class)->names('api.usuarios');
Route::apiResource('/generos',GeneroController::class)->names('api.generos');
Route::apiResource('/tarjetas',TarjetaBancariaController::class)->names('api.tarjetas')->middleware('auth:sanctum');
Route::middleware('auth:sanctum')->post('/tarjetas/{id}/activar', [TarjetaBancariaController::class, 'activar']);
Route::middleware('auth:sanctum')->post('/tarjetas/{id}/desactivar', [TarjetaBancariaController::class, 'desactivar']);
Route::apiResource('/paises',PaisController::class)->names('api.paises');
Route::apiResource('/listas', ListaController::class)
    ->names('api.listas')
    ->middleware('auth:sanctum');
Route::apiResource('/discos', DiscoController::class)
    ->names('api.discos')
    ->middleware('auth:sanctum');
Route::apiResource('/chats',ChatController::class)->names('api.chats');
Route::apiResource('/canciones',CancionController::class)->names('api.canciones');
Route::get('/recomendacion/{id}',[CancionController::class, 'cancionesPorGeneroRecomendacion']);
Route::get('/genero/{id}',[CancionController::class, 'cancionesPorGenero']);
Route::get('/aleatorio',[CancionController::class, 'cancionesAleatorias']);
Route::post('login', [UsuarioApiController::class, 'login'])->name('api.login');


