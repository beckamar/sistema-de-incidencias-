import React from 'react';
import Dropdown from '../Dropdown';
import logoCFE from '/src/assets/logoCFE.png';
import fondoLogin from '/src/assets/fondoLogin.webp';


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
    <div className='relative flex items-center justify-center min-h-screen bg-cover bg-center' style={{ backgroundImage: `url(${fondoLogin})` }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>

    
        <div className='relative flex flex-col items-center justify-center min-h-screen w-full backdrop-blur-md'>
        <img src={logoCFE} alt="Logo CFE" className="w-36 h-auto mt-6 mb-4 md:w-48 md:mt-8 md:mb-5 lg:w-56 lg:mt-10 lg:mb-6" />

        <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 md:w-3/4 lg:w-1/2 xl:w-1/3">
            <div className="flex flex-col p-8 md:p-14 text-center w-full">

                <span className="mb-2 text-xl font-semibold text-gray-600 md:text-2xl lg:text-3xl">Gestion de Incidencias</span>
                <span className="font-normal text-xs text-gray-500 mb-10 md:text-sm lg:text-base">Selecciona la información solicitada</span>

         
                    
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
                        <Dropdown 
                            label="Rol" 
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
                        <div className="mb-2 text-xs text-red-400 md:text-sm lg:text-base">
                            {error}
                        </div>
                        )}
                        <button type="submit" className="btn-primary w-full mt-5 h-7 text-xs font-semibold flex items-center justify-center active:bg-green-400 transition-colors duration-200 md:h-10 md:text-sm lg:h-12 lg:text-base">
                            INGRESAR
                        </button>
                    </form>

                </div>
            </div>
            
        </div>
    </div>




);

export default LoginForm;