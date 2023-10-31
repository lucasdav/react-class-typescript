import { useCallback, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useUsuarioLogado } from "../../shared/hooks";

interface IListItem {
    title: string;
    isSelected: boolean;
}

export const Dashboard = () => {

    //utilizando hook useRef para armazenar objeto
    const counterRef = useRef({ counter: 0 });

    //use context é uma funcao hook
    const {nomeDoUsuario, logout} = useUsuarioLogado();

    const [listaObjeto, setlistaObjeto] = useState<IListItem[]>([]);

    const [lista, setLista]  = useState<string []>(['Teste1', 'Teste2', 'Teste3']);

    const handleInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> = useCallback((e) => {
        if (e.key === 'Enter') {

            //trim() é utilizado para remover espaços
            if (e.currentTarget.value.trim().length === 0) return;

            const value = e.currentTarget.value;

            e.currentTarget.value = '';

            setLista((oldLista) => {
                //abaixo validacao para se valor já existir não é inserido novamente
                if (oldLista.includes(value.trim())) return oldLista;
                // [...]->spading cria uma nova lista mas utiliza todos os valores que já existem
                return [...oldLista, value]
            });
        }
    }, []);

    const handleInputKeyDownObject: React.KeyboardEventHandler<HTMLInputElement> = useCallback((e) => {
        if (e.key === 'Enter') {

            //trim() é utilizado para remover espaços
            if (e.currentTarget.value.trim().length === 0) return;

            const value = e.currentTarget.value;

            e.currentTarget.value = '';

            setlistaObjeto((oldLista) => {
                //abaixo validacao para se valor já existir não é inserido novamente
                if (oldLista.some((listItem) => listItem.title === value)) return oldLista;
                // [...]->spading cria uma nova lista mas utiliza todos os valores que já existem
                return [
                    ...oldLista,
                    {
                        title: value,
                        isSelected: false,
                    }
                ];
            });
        }
    }, []);

    return (
        <>
            <p>Dashboard</p>

            <p>{nomeDoUsuario}</p>

            <p>Contador: {counterRef.current.counter}</p>

            <button onClick={() => counterRef.current.counter++}>Somar</button>
            <button onClick={() => console.log(counterRef.current.counter++)}>Log</button>

            <button onClick={logout}>Logout</button>

            <Link to={"/login"}>Login</Link>

            <input type="text" onKeyDown={handleInputKeyDown} />

            <p>Lista</p>
            <ul>
                {lista.map((value) => {
                    return <li key={value}>{value}</li>;
                })}
            </ul>

            <input type="text" onKeyDown={handleInputKeyDownObject} />
            <p>Lista de Objeto</p>

            <p>{listaObjeto.filter((listaObjeto) => listaObjeto.isSelected).length}</p>
            <ul>
                {listaObjeto.map((listItem) => {
                    return <li key={listItem.title}>
                        <input 
                            type="checkbox"
                            checked={listItem.isSelected}
                            onChange={() => {
                                setlistaObjeto(oldLista => {
                                    return oldLista.map(oldlistItem => {
                                        const newIsSelected = oldlistItem.title === listItem.title
                                            ? !oldlistItem.isSelected
                                            : oldlistItem.isSelected;
                                        return {
                                            ...oldlistItem,
                                            isSelected: newIsSelected,
                                        };
                                    });
                                });
                            }} 
                        />
                        {listItem.title}
                    </li>;
                })}
            </ul>
        </>
    );
}