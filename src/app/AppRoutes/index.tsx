import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Dashboard, Login } from "../pages";
import { DashboardApi } from "../pages/dashboard-api/DashboardApi";

export const AppRoutes = () => {
   
    return (
        <BrowserRouter>
            <Routes>
                
                <Route path="/login" element={<Login/>} />
                <Route path="/pagina-inicial" element={<Dashboard/>} />
                <Route path="/dashboard-api" element={<DashboardApi/>}/>

                {/* abaixo exemplo para qualquer url executada direciona para /pagina-inicial                 */}
                <Route path="*" element={<Navigate to="/dashboard-api" />}/>
            </Routes>
        </BrowserRouter>
    )
};