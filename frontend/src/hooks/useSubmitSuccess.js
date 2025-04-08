import { useEffect } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";


export const useSubmitSuccess = (submitSuccess, navigateRoute = "") => {
    const navigate = useNavigate();

    useEffect(() => {
        if(submitSuccess){
            swal({
                text: "Tu reporte se ha enviado correctamente.",
                icon: "success",
                button: {
                    text: "Aceptar",
                    className: "btn-primary",
                },
            }).then(() => {
                navigate(navigateRoute)
            });
        }
    }, [submitSuccess, navigate,navigateRoute]);
};

export default useSubmitSuccess;
