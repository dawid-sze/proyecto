import React, { Fragment, useRef, useState, useContext } from "react";
import { contextoListado } from "../../Contexto/ProveedorBandas.jsx";
import './formularios.css';
const Formulario_CrearLista = () => {
    const {registrarLista, errores} = useContext(contextoListado)
    const listaInicial = {
        nombre_lista: ""
    };
    const [lista, setLista] = useState(listaInicial);

    const actualizarDato = (evento) => {
        const { name, value } = evento.target;
        setLista({ ...lista, [name]: value })
    }

    const nombreListaoRef = useRef(null);

    return (
        <Fragment>


            <form action="" id="formulario_lista">

                <div>
                    <label htmlFor="nombre">Nombre del disco</label>
                    <input
                        ref={nombreListaoRef}
                        type="text"
                        name="nombre_lista"
                        placeholder="Nombre de lista"
                        required
                        onChange={(evento) => {
                            actualizarDato(evento);
                        }}
                    />
                    <span className="error">{errores.nombre}</span>
                </div>

                <div>
                    <input
                        type="button"
                        value="Crear Lista"
                        onClick={() => {
                           registrarLista(lista)
                        }}
                    />
                </div>

            </form>
        </Fragment>
    );
};

export {
    Formulario_CrearLista
}