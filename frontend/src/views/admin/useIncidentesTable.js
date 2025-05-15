import { useMemo} from 'react';

const useIncidentesTable = ({listaIncidentes, selectedRol, selectedCentro, selectedSubcentro}) => {
    
    const permisos = {
        1: () => true,
        2: ({ incidente, centro, subcentro}) =>
          incidente.id_centrotrabajo == centro &&
        (subcentro == null || incidente.id_subcentro == subcentro),
      };

      const filtradoDatos = useMemo(() => 
        listaIncidentes.filter(incidente => 
          permisos[selectedRol]?.({ incidente, centro: selectedCentro, subcentro: selectedSubcentro })
        ),
        [listaIncidentes, selectedRol, selectedCentro, selectedSubcentro]
      );
    return { filtradoDatos };
};

export default useIncidentesTable;


