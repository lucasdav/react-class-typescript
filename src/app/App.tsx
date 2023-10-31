import { AppRoutes } from "./AppRoutes";
import { UsuarioLogadoProvider } from "./shared/contexts";

export const App = () => {
  return (
    <UsuarioLogadoProvider>
      <AppRoutes/>
    </UsuarioLogadoProvider>
  );
}

