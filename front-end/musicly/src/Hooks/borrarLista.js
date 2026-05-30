
// FUNCIÓN PARA BORRAR LOS LIBROS DE LA API


  export const eliminarLista = async (identificador) => {
        try {
            const respuesta = await fetch(`http://localhost/api/listas/${identificador}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                },
            });a
            if (respuesta) {
                const datos = await respuesta.json();
                if (datos.status == "error") {
                    console.error("Error en los datos:", datos.error);
                } 
            } else {
                console.error("Error de conexión con el servidor");
            }
        } catch (error) {
            console.error("Error en la petición:", error);
        }
    };
