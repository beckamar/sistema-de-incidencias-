import React, { useEffect, useState } from "react";
import { getCentrostrabajo, getRoles, getSubcentros} from "../../utils/networkData";        

const Login = () => {

    const [rolState, set_rolState] = useState([]);
    const [centroTrabajoState, set_centroTrabajoState] = useState([]);
    const [subcentroState, set_subcentroState] = useState([]);

    useEffect(() => {
        const fetchRoles = async () => {
            const { error, data } = await getRoles(); 
            if (!error) {
                set_rolState(data);
            } else {
                console.error(data);
            }
        };
        fetchRoles();
    }, []);


    const onRolChange = async (event) => {
        const selectedRoleId = event.target.value; 
        console.log("ID del ROl seleccionado para obtener centros: ", selectedRoleId);
        const { error, data } = await getCentrostrabajo(selectedRoleId); 
        if (!error) {
            set_centroTrabajoState(data); 
        } else {
            console.error(data); 
        }
    };

    const onCentroChange = async (event) => {
        //const selectedCentroId = event.target.value;  
        const selectedCentroId = event.target.value;  
        console.log("ID del Centro seleccionado para obtener subcentros: ", selectedCentroId);

        const { error, data } = await getSubcentros(selectedCentroId); 
        if (!error) {
            console.log("Subcentros recibidos: ", data);
            set_subcentroState(data); 
        } else {
            console.error(data); 
        }
    };
    console.log("entros de trabajo state: ", centroTrabajoState);

    console.log("SubCentros de trabajo state: ", subcentroState);


    return(
        <div className="h-screen bg-white overflow-hidden relative">
            <div className="container h-screen flex items-center justify-center px-20 mx-auto">
                <div className="w-full max-w-md md:max-w-lg lg:max-w-xl">
                    <div>
                        <h4 className="text-2xl font-semibold mb-7">Gestion de incidencias</h4>
                    </div>

                    <div className="FormBox">
                        <div>
                            <div>
                                <select className="custom-select inline-flex w-full h-10 items-center justify-between rounded-md bg-white px-3 py-2 text-sm font-normal text-gray-600 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50" onChange={(event)=>{onRolChange(event)}}>
                                    <option >Selecciona un rol</option>{
                                        rolState.map((item)=>{
                                            return (<option value={item.id}>
                                                {item.nombre}
                                            </option>)
                                        })
                                    }
                                </select>
                            </div>

                            <div>
                                <select className="custom-select inline-flex w-full h-10 items-center justify-between rounded-md bg-white px-3 py-2 text-sm font-normal text-gray-600 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50" onChange={(event)=>{onCentroChange(event)}}>
                                    <option >Selecciona un Centro</option>{
                                        centroTrabajoState.map((item)=>{
                                            return (<option value={item.id}>
                                                {item.nombre}
                                            </option>)
                                        })
                                    }
                                </select>
                            </div>

                            <div>
                                <select className="custom-select inline-flex w-full h-10 items-center justify-between rounded-md bg-white px-3 py-2 text-sm font-normal text-gray-600 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50">
                                    <option >Selecciona una area/agencia</option>{
                                        subcentroState.map((item)=>{
                                            return (<option value={item.id}>
                                                {item.nombre}
                                            </option>)
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <button type="submit"className="btn-primary">INGRESAR</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login