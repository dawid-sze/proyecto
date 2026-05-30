import React, {Fragment} from "react";
import './Libro.css';
import sin_portada from "./assets/imagenes/sin_portada.jpg";
import { ListaCanciones } from "../Elementos/ListarCanciones.jsx";
// MODELO DE LIBRO QUE UTILIZAMOS PARA LISTAR
const Lista = (props) => {
    
    const {lista} = props;
    return (

        <Fragment>
            <ListaCanciones canciones={lista.canciones}></ListaCanciones>
        </Fragment>
    );
};

export{
    Lista
}