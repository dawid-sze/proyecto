
// FUNCIÓN PARA BORRAR LOS LIBROS DE LA API





export const borrarAPI = async (identificador) => {
    try {
        const respuesta = await fetch(`https://musicly.es/api/usuarios/${identificador}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Authorization": `Bearer ${localStorage.getItem("site")}`
            },
        });
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
