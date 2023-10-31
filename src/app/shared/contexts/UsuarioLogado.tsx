import { ReactNode, createContext, useCallback, useEffect, useState } from "react";

interface IUsuarioLogadoContextData {
    nomeDoUsuario: string;
    logout: () => void;
}

interface IChildren {
    children: ReactNode;
}

export const UsuarioLogadoContext = createContext<IUsuarioLogadoContextData>({} as IUsuarioLogadoContextData);

export const UsuarioLogadoProvider = ( {children}: IChildren ) => {

    const [nome, setNome] = useState('');

    useEffect(() => {
        setTimeout(() => {
            setNome('Lucas');
        }, 3000);
    })

    const handleLogout = useCallback( () => {
        console.log('executou logout')
    }, []);

    return (
        <UsuarioLogadoContext.Provider 
            value={{ nomeDoUsuario: nome, logout: handleLogout }}
        >
            {children}
        </UsuarioLogadoContext.Provider>
    )
}