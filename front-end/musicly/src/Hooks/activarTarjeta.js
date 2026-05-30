export const activarTarjeta = async (id) => {
    try {
        let respuesta = await fetch(`http://localhost/api/tarjetas/${id}/activar`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("site")}`,
                "Content-Type": "application/json",
            }
        });

        if (respuesta) {
            let dato = await respuesta.json();
            if (dato.status !== "error") {
                console.log(dato);
                return dato;
            } else {
                console.log(dato);
                return dato;
            }
        } else {
            console.log("Error de conexión");
        }
    } catch (error) {
        console.error("Error en la petición:", error);
    }
};
