import { Cancion } from "../Elementos_clave/Cancion.jsx";

const ListaCanciones_SinDisco = ({ canciones, onPlay, enLista = false }) => {
  return (
    <>
      {canciones.map((cancion, index) => (
        <Cancion
          key={cancion.id}
          cancion={cancion}
          portada={cancion.disco?.portada}
          enLista={enLista}
          
          alHacerClick={() => onPlay(canciones, index, cancion.disco?.id_genero)}
        />
      ))}
    </>
  );
};

export { ListaCanciones_SinDisco };
