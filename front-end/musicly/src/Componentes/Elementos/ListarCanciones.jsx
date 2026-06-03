import { Cancion } from "../Elementos_clave/Cancion.jsx";

const ListaCanciones = ({ canciones, onPlay, portada, genero, nombre, id }) => {
  return (
    <>
      {canciones.map((cancion, index) => (
        <Cancion
          key={cancion.id}
          cancion={cancion}
          portada={portada}
          nombre = {nombre}
          id = {id}
          alHacerClick={() => onPlay(canciones, index, genero)}
        />
      ))}
    </>
  );
};

export { ListaCanciones };
