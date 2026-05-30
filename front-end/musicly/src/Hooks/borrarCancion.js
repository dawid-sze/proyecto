
// FUNCIÓN PARA BORRAR LOS LIBROS DE LA API

export const eliminarCancion = async (identificador) => {
    try {
        const respuesta = await fetch(`http://localhost/api/canciones/${identificador}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
        });
        if (respuesta) {
            const datos = await respuesta.json();
            if (datos.status == "error") {
                console.error("Error en los datos:", datos.error);
            }else{
                return datos
            }
        } else {
            console.error("Error de conexión con el servidor");
        }
    } catch (error) {
        console.error("Error en la petición:", error);
    }
};
