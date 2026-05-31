
// FUNCIÓN PARA CREAR LOS LIBROS DE LA API

    export const insertarLista = async (objeto) => {
        try {
            let respuesta = await fetch("https://musicly.es/api/listas", {
                method: "POST",
                 headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Authorization": `Bearer ${localStorage.getItem("site")}`
            },
                body: JSON.stringify(objeto),
            });
            if (respuesta.ok) {
                let dato = await respuesta.json();
                if (dato.status !== "error") {
                    console.log(dato);
                    console.log("Registro correcto");
                } else {
                    console.log("Error Registro");
                }
            } else {
                console.log("Error de conexión");
            }
        }catch (error) {
            console.error("Error en la petición:", error);
        }
        
    };
