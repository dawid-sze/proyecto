
export const listarCanciones = async () => {
    try {
        const respuesta = await fetch("https://musicly.es/api/canciones");
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
