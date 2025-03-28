import React from 'react';
import Dropdown from '../Dropdown';
import logoCFE from '/src/assets/logoCFE.png'


const LoginForm = ({ 
    roles, 
    centros, 
    subcentros, 
    showCentros, 
    showSubcentros, 
    handleRolChange, 
    handleCentroChange,
    handleSubcentroChange,
    handleSubmit,
    error 
}) => (

    <div className='flex flex-col items-center justify-center min-h-screen'>
        <img src={logoCFE} alt="Logo CFE" className="w-36 h-auto mt-6 mb-4 md:mt-8 md:mb-5" />

        <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
            <div className="flex flex-col p-8 md:p-14 text-center">

                <span className="mb-2 text-xl font-semibold text-gray-600">Gestion de Incidencias</span>
                <span className="font-normal text-xs text-gray-500 mb-10">Selecciona la información solicitada</span>

                <div>
                    
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <Dropdown 
                            label="Selecciona un rol" 
                            options={roles} 
                            onChange={handleRolChange} 
                        />
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
                            onChange={handleSubcentroChange} 
                        />
                        )}
                        {error && (
                        <div className="mb-2 text-xs text-red-400">
                            {error}
                        </div>
                        )}
                        <button type="submit" className="btn-primary w-full mt-5 h-7 text-xs font-semibold flex items-center justify-center active:bg-green-400 transition-colors duration-200">
                            INGRESAR
                        </button>
                    </form>

                </div>
            </div>
            
        </div>
    </div>


);

export default LoginForm;