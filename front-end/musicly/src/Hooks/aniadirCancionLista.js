
// FUNCIÓN PARA CREAR LOS LIBROS DE LA API

    export const aniadirCancionLista = async (lista_id, cancion_id) => {

        try {
            let respuesta = await fetch(`https://musicly.es/api/aniadirCancion/${lista_id}/${cancion_id}`, {
                method: "POST",
                headers: {
                   "Authorization": `Bearer ${localStorage.getItem("site")}`
                }
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