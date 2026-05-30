import { Cancion } from "../Elementos_clave/Cancion.jsx";

const ListaCanciones = ({ canciones, onPlay, portada, genero }) => {
  return (
    <>
      {canciones.map((cancion, index) => (
        <Cancion
          key={cancion.id}
          cancion={cancion}
          portada={portada}
          alHacerClick={() => onPlay(canciones, index, genero)}
        />
      ))}
    </>
  );
};

export { ListaCanciones };
