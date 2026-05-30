<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\TarjetasPost;
use App\Http\Requests\UsuariosPost;
use App\Http\Requests\UsuarioUpdate;
use App\Models\Usuario;
use Carbon\Carbon;
use Illuminate\Http\Request;
use \Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class UsuarioApiController extends Controller
{
    /**
     * Undocumented function
     *
     * @return void
     */
    public function index()
    {
        $usuarios = Usuario::select('id', 'nombre_grupo', 'avatar')->with(['discos.canciones.comentarios.emisor', 'listas'])->get();
        return response()->json($usuarios, 202);
    }

    /**
     * Undocumented function
     *
     * @param UsuariosPost $request
     * @return void
     */
    public function store(UsuariosPost $request)
    {
        $archivoPath = null;

        if ($request->hasFile('avatar')) {

            $nombreArchivo = $request->file('avatar')->store('', 'repositorio_ficheros');


            $archivoPath = Storage::disk('repositorio_ficheros')->url($nombreArchivo);
        }


        if ($archivoPath === null && $request->avatar_url_google) {
            $archivoPath = $request->avatar_url_google;
        }

        $usuario = Usuario::create([
            'nombre_grupo' => $request->nombre_grupo,
            'nombre'       => $request->nombre,
            'apellidos'    => $request->apellidos,
            'password'     => bcrypt($request->password),
            'email'        => $request->email,
            'avatar'       => $archivoPath,
            'rol'          => $request->rol ?? 'usuario',
            'suscripcion'  => $request->suscripcion ?? false,
            'id_pais'      => $request->id_pais
        ]);
        $usuario->masEscuchados()->syncWithoutDetaching([
            1 => ['reproducciones' => 1]
        ]);

        return response()->json($usuario, 201);
    }

    /**
     * Undocumented function
     *
     * @param string $id
     * @return void
     */
    public function show(string $id)
    {
        $usuarios = Usuario::with(['discos', 'listas', 'tarjetas', 'mensajes', 'pais', 'chats', 'amigos'])->get();
        return response()->json($usuarios, 202);
    }

    /**
     * Undocumented function
     *
     * @param UsuarioUpdate $request
     * @param string $id
     * @return void
     */
    public function update(UsuarioUpdate $request, string $id)
    {
        $usuario = Usuario::findOrFail($id);


        $datosActualizar = [];

        // 1. Lógica del Avatar (Solo si se sube uno nuevo)
        if ($request->hasFile('avatar')) {
            $nombreArchivo = $request->file('avatar')->store('', 'repositorio_ficheros');
            $datosActualizar['avatar'] = Storage::disk('repositorio_ficheros')->url($nombreArchivo);
        }

        if ($request->filled('password')) {
            $datosActualizar['password'] = bcrypt($request->password);
        }


        if ($request->has('nombre_grupo')) $datosActualizar['nombre_grupo'] = $request->nombre_grupo;
        if ($request->has('nombre'))       $datosActualizar['nombre'] = $request->nombre;
        if ($request->has('apellidos'))    $datosActualizar['apellidos'] = $request->apellidos;
        if ($request->has('email'))        $datosActualizar['email'] = $request->email;
        if ($request->has('rol'))          $datosActualizar['rol'] = $request->rol;
        if ($request->has('suscripcion'))  $datosActualizar['suscripcion'] = $request->suscripcion;


        if (!empty($datosActualizar)) {
            $usuario->update($datosActualizar);
        }

        return response()->json($usuario, 200);
    }
    /**
     * Undocumented function
     *
     * @param string $id
     * @return void
     */
    public function destroy(string $id)
    {
        $usuario = Usuario::findOrFail($id);

        $usuario->delete();

        return response()->json($usuario, 201);
    }
    /**
     * Undocumented function
     *
     * @param Request $request
     * @return void
     */
    public function login(Request $request)
    {
        $usuario = Usuario::where('email', $request->email)->first();

        if (
            !$usuario ||
            !Hash::check($request->password, $usuario->password)
        ) {
            return response()->json(
                ['error' => 'Credenciales no válidas'],
                401
            );
        } else {
            return response()->json(['token' =>
            $usuario->createToken($usuario->email)->plainTextToken]);
        }
    }

    public function logOut()
    {
        $usuario = auth()->user();
        $usuario->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Has salido de la cuenta',
        ], 200);
    }
    /**
     * Undocumented function
     *
     * @param Request $request
     * @return void
     */
    public function usuario(Request $request)
    {

        return response()->json([
            $request->user()->load([
                'discos.canciones',
                'listas.canciones.comentarios.emisor',
                'listas.canciones.disco',
                'tarjetas',
                'mensajes',
                'amigos',
                "pais",
                "suscripcion_real",
                "likes.disco",
                'masEscuchados' => function ($query) {
                    $query->orderByDesc('reproducciones');
                }
            ])
        ], 200);
    }
    /**
     * Undocumented function
     *
     * @param string $id
     * @return void
     */
    public function reproducciones(string $id)
    {
        $user = auth()->user();

        $current = $user->masEscuchados()
            ->where('id_genero', $id)
            ->first();

        $newValue = $current
            ? $current->pivot->reproducciones + 1
            : 1;

        $user->masEscuchados()->syncWithoutDetaching([
            $id => ['reproducciones' => $newValue]
        ]);

        return response()->json([
            'reproducciones' => $newValue
        ]);
    }
    /**
     * Undocumented function
     *
     * @param TarjetasPost $request
     * @return void
     */
    public function suscribirse(TarjetasPost $request)
    {
        $user = auth()->user();

        try {
            DB::transaction(function () use ($request, $user) {

                \App\Models\TarjetaBancaria::where('id_usuario', $user->id)
                    ->update(['estado' => 'inactivo']);

                \App\Models\TarjetaBancaria::create([
                    'id_usuario'      => $user->id,
                    'numero_tarjeta'  => $request->numero_tarjeta,
                    'fecha_caducidad' => $request->fecha_caducidad,
                    'cvv'             => $request->cvv,
                    'estado'          => 'activo',
                ]);

                $user->suscripcion_real()->updateOrCreate(
                    ['id_usuario' => $user->id],
                    [
                        'estado'            => 'activa',
                        'fecha_suscripcion' => Carbon::today(),
                    ]
                );
            });

            return response()->json([
                'message' => 'Suscripción y tarjeta guardadas correctamente',
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'error'   => 'No se pudo completar la suscripción.',
                'details' => $e->getMessage()
            ], 500);
        }
    }
    /**
     * Undocumented function
     *
     * @return void
     */
    public function desuscribirse()
    {
        $user = auth()->user();

        $suscripcion = $user->suscripcion_real;

        if (!$suscripcion) {
            return response()->json([
                'message' => 'No tienes ninguna suscripción activa'
            ], 404);
        }

        $tarjetaActiva = \App\Models\TarjetaBancaria::where('id_usuario', $user->id)
            ->where('estado', 'activo')
            ->first();

        if ($tarjetaActiva) {
            $suscripcion->update([
                'estado'            => 'activa',
                'fecha_suscripcion' => Carbon::today(),
            ]);

            return response()->json([
                'message' => 'Suscripción renovada correctamente con la tarjeta activa.',
                'data'    => $suscripcion
            ]);
        }

        $suscripcion->update([
            'estado' => 'inactiva'
        ]);

        return response()->json([
            'message' => 'Suscripción desactivada correctamente. No tienes tarjeta activa.',
            'data'    => $suscripcion
        ]);
    }
    /**
     * Undocumented function
     *
     * @param string $id_cancion
     * @return void
     */
    public function likear_cancion(string $id_cancion)
    {
        auth()->user()
            ->likes()
            ->syncWithoutDetaching([$id_cancion]);

        return response()->json([
            'message' => 'Canción likeada correctamente'
        ]);
    }
    /**
     * Undocumented function
     *
     * @param string $id_cancion
     * @return void
     */
    public function deslikear_cancion(string $id_cancion)
    {
        auth()->user()
            ->likes()
            ->detach($id_cancion);

        return response()->json([
            'message' => 'Like eliminado correctamente'
        ]);
    }
}
