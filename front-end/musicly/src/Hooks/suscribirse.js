
// FUNCIÓN PARA CREAR LOS LIBROS DE LA API

    export const suscribirse = async (suscripcion) => {
        console.log(suscripcion)
        try {
            let respuesta = await fetch(`http://localhost/api/suscribirse`, {
                method: "POST",
                headers: {
                   "Authorization": `Bearer ${localStorage.getItem("site")}`,
                   "Content-Type": "application/json",
                },
                body: JSON.stringify(suscripcion)
            });
            if (respuesta) {
                let dato = await respuesta.json();
                if (dato.status !== "error") {
                    console.log(dato);
                    return dato
                    console.log("correcto");
                } else {
                    console.log(dato);
                    return dato
                    console.log("Error");
                }
            } else {
                console.log("Error de conexión");
            }
        }catch (error) {
            console.error("Error en la petición:", error);
        }
        
    };