import React, { useState } from "react";
import Dropdown from "../../components/Dropdown";               

const Login = () => {

    const [rolState, set_rolState] = useState("");
    const [centroTrabajoState, set_centroTrabajoState] = useState("");
    const [subcentroState, set_subcentroState] = useState("");



    const roles = [
        { value: "superintendente", label: "Superintendente" },
        { value: "jefe", label: "Jefe zona/agencia" },
        { value: "empleado", label: "Empleado" },
    ];

    const centrosTrabajo = [
        { value: "centro1", label: "Centro de Trabajo 1" },
        { value: "centro2", label: "Centro de Trabajo 2" },
        { value: "centro3", label: "Centro de Trabajo 3" },
    ];

    const subcentrosTrabajo = [
        { value: "subcentro1", label: "Subcentro de Trabajo 1" },
        { value: "subcentro2", label: "Subcentro de Trabajo 2" },
        { value: "subcentro3", label: "Subcentro de Trabajo 3" },
    ];


    return(
        <div className="h-screen bg-green-100 overflow-hidden relative">
            <div className="container h-screen flex items-center justify-center px-20 mx-auto">
                <div className="">
                    <div>
                        <h4 className="text-2xl font-semibold mb-7">Gestion de incidencias</h4>
                    </div>

                    <div className="">

                        <form onSubmit={() => {}}>

                            <div className="mb-4">
                                <Dropdown
                                    label="Selecciona un rol"
                                    options={roles}
                                    selected={rolState}
                                    onSelect={set_rolState}
                                />
                            </div>

                            <div className="mb-4">
                                <Dropdown
                                    label="Selecciona un centro de trabajo"
                                    options={centrosTrabajo}
                                    selected={centroTrabajoState}
                                    onSelect={set_centroTrabajoState}
                                />
                            </div>

                            <div className="mb-4">
                                <Dropdown
                                    label="Selecciona un subcentro de trabajo"
                                    options={subcentrosTrabajo}
                                    selected={subcentroState}
                                    onSelect={set_subcentroState}
                                />
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login