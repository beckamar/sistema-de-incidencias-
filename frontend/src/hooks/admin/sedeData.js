import useFetchData from '../useFetchData';
import { getCentros, getSubcentros } from '../../services/api/sedesService';

const sedeData = () => {

  const {data:centros, error: centrosError} = useFetchData(getCentros);
  const {data: subcentros, error:subcentrosError, fetchData: fetchSubcentros} = useFetchData(getSubcentros);
  

    
  return {
    centros,
    centrosError,
    subcentros,
    subcentrosError,
    fetchSubcentros 
  }

};

export default sedeData;
