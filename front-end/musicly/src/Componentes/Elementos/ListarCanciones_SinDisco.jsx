import { Cancion } from "../Elementos_clave/Cancion.jsx";
//Función para listar canciones que no vienen de un disco, estructura diferente 
const ListaCanciones_SinDisco = ({ canciones, onPlay }) => {
  return (
    <>
      {canciones.map((cancion, index) => (
        <Cancion
          key={cancion.id}
          cancion={cancion}
          portada={cancion.disco.portada}
          alHacerClick={() => onPlay(canciones, index, cancion.disco.id_genero)}
        />
      ))}
    </>
  );
};

export { ListaCanciones_SinDisco };
