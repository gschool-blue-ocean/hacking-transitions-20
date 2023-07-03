import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App/App";
import { CohortProvider } from "./context/CohortContext.jsx";
import { AppointmentProvider } from "./context/AppointmentContext.jsx";

createRoot(document.getElementById("root")).render(

    <CohortProvider>
        <AppointmentProvider>
            <App /> 
        </AppointmentProvider>   
    </CohortProvider>
    
);
