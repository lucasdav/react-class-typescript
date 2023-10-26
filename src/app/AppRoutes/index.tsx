import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Dashboard, Login } from "../pages";

export const AppRoutes = () => {
   
    return (
        <BrowserRouter>
            <Routes>
                
                <Route path="/login" element={<Login/>} />
                <Route path="/pagina-inicial" element={<Dashboard/>} />

                {/* abaixo exemplo para qualquer url executada direciona para /pagina-inicial                 */}
                <Route path="*" element={<Navigate to="/pagina-inicial" />}/>
            </Routes>
        </BrowserRouter>
    )
};