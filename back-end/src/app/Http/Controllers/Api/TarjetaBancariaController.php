<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\TarjetasPost;
use App\Models\TarjetaBancaria;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TarjetaBancariaController extends Controller
{
  /**
   * Undocumented function
   *
   * @param TarjetasPost $request
   * @return void
   */
    public function store(TarjetasPost $request)
    {
        $user = auth()->user();

        try {
            $tarjeta = DB::transaction(function () use ($request, $user) {


                TarjetaBancaria::where('id_usuario', $user->id)
                    ->update(['estado' => 'inactivo']);


                return TarjetaBancaria::create([
                    'id_usuario'      => $user->id,
                    'numero_tarjeta'  => $request->numero_tarjeta,
                    'fecha_caducidad' => $request->fecha_caducidad,
                    'cvv'             => $request->cvv,
                    'estado'          => 'activo',
                ]);
            });

            return response()->json([
                'message' => 'Tarjeta registrada y activada correctamente.',
                'tarjeta' => $tarjeta
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'error'   => 'No se pudo registrar la tarjeta.',
                'details' => $e->getMessage()
            ], 500);
        }
    }

   /**
    * Undocumented function
    *
    * @param string $id
    * @return void
    */
    public function activar(string $id)
    {
        $user = auth()->user();

        $tarjeta = TarjetaBancaria::where('id', $id)
            ->where('id_usuario', $user->id)
            ->first();

        if (!$tarjeta) {
            return response()->json(['error' => 'Esta tarjeta no te pertenece.'], 403);
        }

        DB::transaction(function () use ($user, $id) {
            TarjetaBancaria::where('id_usuario', $user->id)
                ->update(['estado' => 'inactivo']);

            TarjetaBancaria::where('id', $id)
                ->update(['estado' => 'activo']);
        });

        return response()->json(['message' => 'Tarjeta activada correctamente.'], 200);
    }

    /**
     * Undocumented function
     *
     * @param string $id
     * @return void
     */
    public function desactivar(string $id)
    {
        $user = auth()->user();

        $tarjeta = TarjetaBancaria::where('id', $id)
            ->where('id_usuario', $user->id)
            ->first();

        if (!$tarjeta) {
            return response()->json(['error' => 'Esta tarjeta no te pertenece.'], 403);
        }

        $tarjeta->update(['estado' => 'inactivo']);

        return response()->json(['message' => 'Tarjeta desactivada correctamente.'], 200);
    }

    /**
     * Undocumented function
     *
     * @param string $id
     * @return void
     */
    public function destroy(string $id)
    {
        $tarjeta = TarjetaBancaria::where('id', $id)
            ->where('id_usuario', auth()->id())
            ->firstOrFail();

        $tarjeta->delete();

        return response()->json($tarjeta, 200);
    }
}
