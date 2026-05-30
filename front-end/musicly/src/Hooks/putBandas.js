
// FUNCIÓN PARA MODIFICAR LOS LIBROS DE LA API

export const modificarAPI = async (objeto) => {
    const id = objeto.get('id');
    try {
        const respuesta = await fetch(`http://localhost/api/usuarios/${id}`, {
            method: "POST", // Se envía como POST para que PHP pueda leer los archivos
            body: objeto,
            headers: {
                "Accept": "application/json"
            }
        });
        if (respuesta) {
            const datos = await respuesta.json();
            if (datos.status == "error") {
                console.error("Error en los datos:", datos.error);
            } else {
                return datos
            }
        } else {
            console.error("Error de conexión con el servidor");
        }
    } catch (error) {
        console.error("Error en la petición:", error);
    }
};
