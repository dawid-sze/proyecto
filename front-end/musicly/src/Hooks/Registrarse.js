
// FUNCIÓN PARA CREAR LOS LIBROS DE LA API

   export const Registrarse = async (objeto) => {
        for (let pair of objeto.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
    }
        try {
            let respuesta = await fetch("https://musicly.es/api/usuarios", {
                method: "POST",
                body: objeto
            });
            if (respuesta) {
                let dato = await respuesta.json();
                if (dato.status !== "error") {
                    console.log(dato);
                    return dato
                    console.log("Registro correcto");
                } else {
                    console.log(dato)
                    return dato
                    console.log("Error Registro");
                }
            } else {
                console.log("Error de conexión");
            }
        }catch (error) {
            console.error("Error en la petición:", error);
        }
        
    };
