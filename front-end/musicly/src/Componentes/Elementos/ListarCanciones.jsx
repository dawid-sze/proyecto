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
          id_banda = {id}
          alHacerClick={() => onPlay(canciones, index, genero, portada)}
        />
      ))}
    </>
  );
};

export { ListaCanciones };
