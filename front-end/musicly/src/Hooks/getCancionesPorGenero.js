// FUNCIÓN PARA RECOGER LOS LIBROS DE LA API

  export const listarCancionesPorGenero = async (identificador) => {
        try {
            const respuesta = await fetch(`https://musicly.es/api/genero/${identificador}`);
            let datos;
            if (respuesta) {
                datos = await respuesta.json();
                if (datos.status == "error") {
                     console.error("Error en los datos:", datos.error);
                } else{
                    return datos;
                }
            } else {
                console.error("Error de conexión con el servidor");
            }
            
        } catch (error) {
            console.error("Error en la petición:", error);
        }
    };