// FUNCIÓN PARA RECOGER LOS LIBROS DE LA API

    export const obtenerUsuario = async (token) => {
        try {
            const respuesta = await fetch("https://musicly.es/api/usuario", {
                method: "GET", // o POST según tu ruta
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            let datos;
            if (respuesta) {
                datos = await respuesta.json();
                if (datos.status == "error") {
                    console.error("Error en los datos:", datos.error);
                } else {
                    return datos;
                }
            } else {
                console.error("Error de conexión con el servidor");
            }

        } catch (error) {
            console.error("Error en la petición:", error);
        }
    };
