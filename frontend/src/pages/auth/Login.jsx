import React from "react";
import {useLoginForm } from "../../components/auth/useLoginForm.js";
import LoginForm from "../../components/auth/LoginForm.jsx";

const Login = () => {
    const form = useLoginForm();

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <LoginForm {...form} />
        </div>
    );
};

export default Login;