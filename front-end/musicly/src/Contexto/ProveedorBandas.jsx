import React, { useState, useEffect, createContext, Fragment, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { listarAPI } from "../Hooks/getBandas.js";
import { borrarAPI } from "../Hooks/borrarBanda.js";
import { Registrarse } from "../Hooks/Registrarse.js";
import { modificarAPI } from "../Hooks/putBandas.js";
import { listarPaises } from "../Hooks/obtenerPaises.js";
import { insertarDisco } from "../Hooks/postDisco.js";
import { listarGeneros } from "../Hooks/obtenerGeneros.js";
import { listarCanciones } from "../Hooks/getCanciones.js";
import { insertarCancion } from "../Hooks/postCanciones.js";
import { insertarLista } from "../Hooks/postListas.js";
import { eliminarCancion } from "../Hooks/borrarCancion.js";
import { eliminarDisco } from "../Hooks/borrarDiscos.js";
import { eliminarLista } from "../Hooks/borrarLista.js";
import { listarCancionesAleatorias } from "../Hooks/getCancionesAleatorias.js";
import { listarPorGeneroMasEscuchado } from "../Hooks/getPorGeneroMasEscuchado.js";
import { AuthContext } from "./ProveedorAutentificacion.jsx";
import { listarCancionesPorGenero } from "../Hooks/getCancionesPorGenero.js";
import { obtenerUsuario } from "../Hooks/obtenerUsuario.js";
import { reproduccionesUsuario } from "../Hooks/reproduccionesUsuario.js";
import { reproduccionesCancion } from "../Hooks/reproduccionesCancion.js";
import { aniadirCancionLista } from "../Hooks/aniadirCancionLista.js";
import { eliminarCancionLista } from "../Hooks/eliminarCancionLista.js";
import { suscribirse } from "../Hooks/suscribirse.js";
import { activarTarjeta as activarTarjetaHook } from "../Hooks/activarTarjeta.js";
import { desactivarTarjeta as desactivarTarjetaHook } from "../Hooks/desactivarTarjeta.js";
import { desuscribirse } from "../Hooks/desuscribirse.js";
import { estadisticasGenero } from "../Hooks/estadisticasGenero.js";
import { comentarCancion } from "../Hooks/comentarCancion.js";
//LO PRIMERO QUE TENEMOS QUE HACER ES CREAR EL CONTEXTO PARA QUE EL RESTO DE COMPONENTES PUEDAN ACCEDER A ÉL
const contextoListado = createContext();

//Función para manejar el flujo de información
const ProveedorBandas = (props) => {
    //SETEAMOS EL ESTADO DE LA BIBLIOTECA, ES DECIR, DEL ARRAY//
    const { iniciarSesion, token, user, setUser } = useContext(AuthContext)
    const [initialized, setInitialized] = useState(false);
    const [listado, setListado] = useState([]);
    const [estadisticas, setEstadisticas] = useState([]);
    const [errores, setErrores] = useState([]);
    const [paises, setPaises] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [canciones, setCanciones] = useState([]);
    const [cancionesPorGenero, setcancionesPorGenero] = useState([]);
    const [cancionesAleatorias, setCancionesAleatorias] = useState([]);
    const [cancionesGeneroMasEscuchado, setcancionesGeneroMasEscuchado] = useState([]);
    const [lista_id, setLista_id] = useState("");


    //CREAMOS LAS NAVEGACIONES
    const navegar = useNavigate();

    //FUNCIÓN PARA INICIALIZAR LA BIBLIOTECA
    const inicializarListado = async () => {
        const datos = await listarAPI();
        setListado(datos);
        inicializarListadoPorGeneroMasEscuchado()
        inicializarCancionesAleatorias();
        inicializarListadoPorGenero()
    };
    //Listado de canciones según el género mas escuchado del usuario
    const inicializarListadoPorGeneroMasEscuchado = async (user) => {
        const datos = await listarPorGeneroMasEscuchado(user.mas_escuchados[0].id);
        setcancionesGeneroMasEscuchado(datos);
    };

    const inicializarListadoPorGenero = async (id) => {
        const datos = await listarCancionesPorGenero(id);
        setcancionesPorGenero(datos);
    };


    const inicializarPaises = async () => {
        const datos = await listarPaises();
        setPaises(datos);
    };
    const inicializarCancionesAleatorias = async () => {
        const datos = await listarCancionesAleatorias();
        setCancionesAleatorias(datos);
    };



    const inicializarCanciones = async () => {
        const datos = await listarCanciones();
        setCanciones(datos);
    };


    const iniciarlizarGeneros = async () => {
        const datos = await listarGeneros();
        setGeneros(datos);
    };

    //FUNCIÓN PARA BORRAR Grupo
    const borrarGrupo = async (identificador) => {
        try {
            await borrarAPI(identificador);
            inicializarListado();
            navegar("admin");
        } catch (error) {
            console.error("Error al eliminar:", error);
        }
    }

    const deleteCancion = async (identificador) => {
        try {
            let datos = await eliminarCancion(identificador);
            let usaurio = await obtenerUsuario(token)
            setUser(usaurio)
            inicializarListado();
        } catch (error) {
            console.error("Error al eliminar:", error);
        }
    }

    const deleteDisco = async (identificador) => {
        try {
            let datos = await eliminarDisco(identificador);
            let usaurio = await obtenerUsuario(token)
            setUser(usaurio)
            inicializarListado();
            navegar('/admin')
        } catch (error) {
            console.error("Error al eliminar:", error);
        }
    }

    const deleteLista = async (identificador) => {
        try {
            await eliminarLista(identificador);
            let usaurio = await obtenerUsuario(token)
            setUser(usaurio)
            inicializarListado();
        } catch (error) {
            console.error("Error al eliminar:", error);
        }
    }


    //FUNCIÓN PARA INSERTAR LIBRO
    const registrarUsuario = async (banda) => {
        try {
            const datos = await Registrarse(banda);
            if (!datos.errors) {
                inicializarListado();
                navegar(`/login`);
            } else {
                setErrores(datos.errors)
            }

        } catch (error) {
            console.error("Error al crear:", error);
        }
    }

    const registrarDisco = async (disco) => {
        try {
            const datos = await insertarDisco(disco);
            if (!datos.errors) {
                let usaurio = await obtenerUsuario(token)
                setUser(usaurio)
                inicializarListado();
                navegar(`/`);
            } else {
                setErrores(datos.errors)
            }

        } catch (error) {
            console.error("Error al crear:", error);
        }
    }

    const registrarLista = async (lista) => {

        const datos = await insertarLista(lista);
        let usaurio = await obtenerUsuario(token)
        setUser(usaurio)
    }

    const insertarCancionLista = async (lista, cancion) => {
        const datos = await aniadirCancionLista(lista, cancion);
        let usaurio = await obtenerUsuario(token)
        setUser(usaurio)
    }

    const activarTarjeta = async (id) => {
        const datos = await activarTarjetaHook(id);
        if (datos && !datos.errors) {
            let usaurio = await obtenerUsuario(token);
            setUser(usaurio);
        } else {
            setErrores(datos?.errors || []);
        }
    };

    const desactivarTarjeta = async (id) => {
        const datos = await desactivarTarjetaHook(id);
        if (datos && !datos.errors) {
            let usaurio = await obtenerUsuario(token);
            setUser(usaurio);
        } else {
            setErrores(datos?.errors || []);
        }
    };

    const activarSuscripcion = async (suscripcion) => {
        const datos = await suscribirse(suscripcion);
        if (datos?.errors) {
            setErrores(datos.errors);
        } else if (datos?.error) {
            setErrores({ general: datos.error });
        } else {
            setErrores([]);
            let usaurio = await obtenerUsuario(token);
            setUser(usaurio);
        }
        return datos;
    }

    const desactivarSuscripcion = async () => {
        const datos = await desuscribirse();
        let usaurio = await obtenerUsuario(token)
        setUser(usaurio)
    }

    const borrarCancionLista = async (lista, cancion) => {
        const datos = await eliminarCancionLista(lista, cancion);
        let usaurio = await obtenerUsuario(token)
        setUser(usaurio)
        navegar('/listarUsuario')
    }

    const registrarCancion = async (cancion) => {
        try {
            const datos = await insertarCancion(cancion);
            if (!datos.errors) {
                let usaurio = await obtenerUsuario(token)
                setUser(usaurio)
                inicializarListado();
                navegar(`/`);
            } else {
                console.log(datos.errors)
                setErrores(datos.errors)
            }

        } catch (error) {
            console.error("Error al crear:", error);
        }
    }

    const obtenerEstadisticas = async () =>{
        let datos = await estadisticasGenero();
        setEstadisticas(datos)
    }

    //FUNCIÓN PARA MODIFICAR
    const modificarUsuario = async (banda) => {
        try {
            let datos = await modificarAPI(banda);
            if (!datos.errors) {
                let usaurio = await obtenerUsuario(token)
                setUser(usaurio)
                navegar(`/`);
                inicializarListado();
            } else {
                setErrores(datos.errors)
            }
        } catch (error) {
            console.error("Error al modificar:", error);
        }
    }


    const encontrarBanda = (identificador) => {
        const libroBuscado = biblioteca.filter((banda) => {
            return banda.id == identificador
        });
        return libroBuscado;
    }
    //Función para determinar si una suscripción está expirada o no
    const suscripcionExpirada = (usuario) => {
        if (!usuario.suscripcion_real) return false;

        const fecha = new Date(usuario.suscripcion_real.fecha_suscripcion);
        const hoy = new Date();

        const diffDias = (hoy - fecha) / (1000 * 60 * 60 * 24);

        return diffDias > 30;
    };

    const crearComentario = async (comentario, id) => {
        const datos = await comentarCancion(comentario, id);
        if (!datos.errors) {
                let usaurio = await obtenerUsuario(token)
                setUser(usaurio)
                 inicializarListado();
            } else {
                setErrores(datos.errors)
            }
    }

    const limpiarErrores = () => setErrores([]);
    //DISTINTOS USEEFFECT PARA INICIARLIUZAR LAS FUNCIÓNES 
    useEffect(() => {
        if (user && !initialized) {
            inicializarListado();
            inicializarPaises();
            iniciarlizarGeneros();
            inicializarCanciones();
            setInitialized(true);
        }
    }, [user, initialized]);

    useEffect(() => {
        if (!user?.length) return;
        if (!user[0]?.mas_escuchados?.length) return;

        inicializarListadoPorGeneroMasEscuchado(user[0]);
    }, [user]);

    const [verificado, setVerificado] = useState(false);

    useEffect(() => {
        const checkSuscripcion = async () => {
            if (!user?.length || verificado) return;

            if (!user[0]?.suscripcion_real) return;

            if (suscripcionExpirada(user[0])) {
                console.log("Suscripción expirada → desactivando...");

                await desuscribirse();

                const usuarioActualizado = await obtenerUsuario(token);
                setUser(usuarioActualizado);
            }

            setVerificado(true);
        };

        checkSuscripcion();
    }, [user]);

    useEffect(() => {
        inicializarPaises();
    }, []);

    const exportacion = {
        inicializarListado,
        inicializarPaises,
        borrarGrupo,
        registrarUsuario,
        modificarUsuario,
        listado,
        errores,
        paises,
        registrarDisco,
        generos,
        iniciarlizarGeneros,
        inicializarCanciones,
        registrarCancion,
        registrarLista,
        deleteCancion,
        deleteDisco,
        deleteLista,
        cancionesAleatorias,
        cancionesGeneroMasEscuchado,
        inicializarListadoPorGenero,
        cancionesPorGenero,
        reproduccionesUsuario,
        reproduccionesCancion,
        insertarCancionLista,
        borrarCancionLista,
        activarSuscripcion,
        desactivarSuscripcion,
        setLista_id,
        lista_id,
        obtenerEstadisticas,
        estadisticas,
        crearComentario,
        activarTarjeta,
        desactivarTarjeta,
        limpiarErrores
    };

    return (
        <Fragment>
            <contextoListado.Provider value={exportacion}>
                {props.children}
            </contextoListado.Provider>
        </Fragment>
    );


}

export {
    ProveedorBandas, contextoListado
}