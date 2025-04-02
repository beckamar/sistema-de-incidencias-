import { useState, useEffect, useCallback } from "react";

const useFetchData = (fetchFunction, dependencies = [], initialFetch = true) => {

    const [data, setData] = useState([]);
    const [error, setError] = useState(null); 

    const fetchData = useCallback(async(...args) => {
        setError(null);
        try {
            const { error: fetchError, data: fetchData } = await fetchFunction(...args);
            if(!fetchError){
                setData(fetchData)
            }else{
                setError(fetchError);
            }
        } catch (err) {
            setError("Error de conexion");
        }
    }, [fetchFunction]);

    useEffect(()=>{
        if(initialFetch) {
            fetchData();
        }
    }, [...dependencies, initialFetch]);
    return {data, error, fetchData};
};

export default useFetchData;