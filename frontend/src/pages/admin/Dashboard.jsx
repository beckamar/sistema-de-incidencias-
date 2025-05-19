import React from "react";
import useDashboardIncidentes from "../../views/admin/useDashboardIncidentes.js";
import { DashboardIncidentes } from "../../views/admin/DashboardIncidentes.jsx";

const Dashboard = () => {

    const form = useDashboardIncidentes();

    return (
        <DashboardIncidentes {...form}/>
    );
};

export default Dashboard;