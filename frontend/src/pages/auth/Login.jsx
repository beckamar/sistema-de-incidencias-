import React from "react";
import {useLoginForm } from "../../components/auth/useLoginForm.js";
import LoginForm from "../../components/auth/LoginForm.jsx";

const Login = () => {
    const form = useLoginForm();

    return (
        <div >
            <LoginForm {...form} />
        </div>
    );
};

export default Login;