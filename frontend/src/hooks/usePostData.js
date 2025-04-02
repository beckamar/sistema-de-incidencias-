import { useCallback, useState } from "react";

const usePostData = (postFunction) => {
        const [data, setData] = useState([]);
        const [error, setError] = useState(null); 

        const executePost = useCallback(async() => {

            setError(null);

            try {
                const {error: postError, data: responseData} = await postFunction(...args);
                if(!postError){
                    setData(responseData);
                }else{
                    setError(responseData);
                }
                return { success: !postError, data: responseData};
            } catch (error) {
                setError("Error de conexion");
                return {success: false, error: "Error de conexion"};
            }
        }, [postFunction]);
        return {data, error, executePost};
};

export default usePostData;