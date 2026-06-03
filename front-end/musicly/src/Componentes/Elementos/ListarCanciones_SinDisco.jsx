import { Cancion } from "../Elementos_clave/Cancion.jsx";

const ListaCanciones_SinDisco = ({ canciones, onPlay, enLista = false }) => {
  console.log(canciones)
  return (
    <>
      {canciones.map((cancion, index) => (
        <Cancion
          key={cancion.id}
          cancion={cancion}
          portada={cancion.disco?.portada}
          nombre = {cancion.disco.grupo?.nombre_grupo || cancion.nombre_grupo}
          id_banda = {cancion.disco.grupo?.id || cancion.id}
          enLista={enLista}
          
          alHacerClick={() => onPlay(canciones, index, cancion.disco?.id_genero)}
        />
      ))}
    </>
  );
};

export { ListaCanciones_SinDisco };
