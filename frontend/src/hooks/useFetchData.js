import {useState, useEffect} from "react";


const useFetchData = (endpoints) => {

    const [ data, setData ] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=> {
        const fetchData = async() => {
            setLoading(true);
            try {
                const responses = await Promise.all(endpoints.map( async (endpoint) => await endpoint()));
                const validateData = responses.map((response) => {
                    if(!response.data) throw new Error("Datos invalidos recibidos de API");
                    return response.data;
                }); 
                setData(validateData);
            } catch (error) {
                console.error("Error fetching data: ", error);
                setError(error.message);
            }finally{
                setLoading(false);
            }
        };
        fetchData();
    }, [JSON.stringify(endpoints.toString())]); 
    return {data, loading, error};
};


export default useFetchData;