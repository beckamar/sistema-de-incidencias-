import React from "react";
import {useLoginForm } from "../../views/auth/useLoginForm.js";
import LoginForm from "../../views/auth/LoginForm.jsx";

const Login = () => {
    const form = useLoginForm();

    return (
        <div >
            <LoginForm {...form} />
        </div>
    );
};

export default Login;