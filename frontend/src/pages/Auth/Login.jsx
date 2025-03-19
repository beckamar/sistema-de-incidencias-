import React, { useEffect, useMemo, useState } from "react";
import Dropdown from "../../components/Dropdown";       
import { getCentrotrabajo, getRoles, getSubcentro } from "../../utils/networkData";        

const Login = () => {

    const [rolState, set_rolState] = useState([]);
    const [selectedRolId, setSelectedRolId] = useState(null);

    const [centroTrabajoState, set_centroTrabajoState] = useState([]);
    const [selectedIdCentro, setSelectedIdCentro] = useState([null]);

    const [subcentroState, set_subcentroState] = useState([]);

    useEffect(() => {
        getRoles().then((response) => {
            set_rolState(response.data); 
        });
    }, []);

    


    const selectedRol = rolState.find((rol) => rol.id_rol === selectedRolId);
    const selectedCentro = centroTrabajoState.find((centroTrabajo) => centroTrabajo.id_centrotrabajo === selectedIdCentro);
    const dropdownsAdicionales = selectedRol?.nombre_rol === "Jefe zona/agencia" || selectedRol?.nombre_rol === "Empleado";


    return(
        <div className="h-screen bg-white overflow-hidden relative">
            <div className="container h-screen flex items-center justify-center px-20 mx-auto">
                <div className="w-full max-w-md md:max-w-lg lg:max-w-xl">
                    <div>
                        <h4 className="text-2xl font-semibold mb-7">Gestion de incidencias</h4>
                    </div>

                    <div className="">
                    <form onSubmit={() => {}} >
                        <div className="mb-4">
                            <Dropdown
                                label="Rol"
                                options={rolState}
                                selected={selectedRol?.nombre_rol}
                                onSelect={(selectedRolId) => setSelectedRolId(selectedRolId)}
                            />
                        </div>
                        {dropdownsAdicionales &&(
                            <div className="mb-4">
                                <Dropdown
                                    label="Centro de trabajo"
                                    options={centroTrabajoState}
                                    selected={selectedCentro?.nombre}
                                    onSelect={(selectedIdCentro) => setSelectedIdCentro(selectedIdCentro)}

                                />
                            </div>
                        )}
                        {dropdownsAdicionales && (
                            <div className="mb-4">
                                <Dropdown
                                    label="Zona/Agencia"
                                    options={subcentroState}
                                    selected={subcentroState.find((subcentro) => subcentro.isSelected)}
                                    onSelect={(selectedSubcentro) => set_subcentroState(selectedSubcentro)}
                                />
                            </div>
                        )}

                        <button type="submit"className="btn-primary">INGRESAR</button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login