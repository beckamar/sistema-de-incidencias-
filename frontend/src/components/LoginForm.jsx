import React from 'react';
import Dropdown from './Dropdown';

const LoginForm = ({ 
    roles, 
    centros, 
    subcentros, 
    showCentros, 
    showSubcentros, 
    handleRolChange, 
    handleCentroChange,
    onSubmit,
    error 
}) => (
    <div className="w-full max-w-lg p-6 rounded-lg shadow-md md:w-3/4 lg:w-1/2 xl:w-1/3">
        <h4 className="text-2xl font-semibold mb-4">Gestión de Incidencias</h4>

        {error &&(
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
        )}
        <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-4">
            <Dropdown label="Rol" options={roles} onChange={handleRolChange} />
            
            {showCentros && (
                <Dropdown 
                    label="Centro de Trabajo" 
                    options={centros} 
                    onChange={handleCentroChange} 
                />
            )}
            
            {showSubcentros && (
                <Dropdown 
                    label="Área/Agencia" 
                    options={subcentros} 
                    onChange={() => {}} 
                />
            )}
        </div>
        <button type="submit" className="btn-primary w-full mt-4">INGRESAR</button>
        </form>

    </div>
);

export default LoginForm;