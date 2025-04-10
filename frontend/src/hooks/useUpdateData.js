import {useState} from 'react';

export const useUpdateData = (updateFunction) => {

    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState(null);

    const updateData = async(...args) => {
        setIsUpdating(true);
        setError(null);

        try {
            const result = await updateFunction(...args);
            if(result.error){
                setError(result.data);
                return {success:false, data: result.data};
            }
            return {success:true, data:result.data};
            
        } catch (err) {
            setError(err.message || "Error useUpdateData");
            return {success:false, data: err.message};
        }finally{
            setIsUpdating(false);
        }
    };
   return { isUpdating, error, updateData};

};

export default useUpdateData;
