import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useUsuarioLogado } from "../../shared/hooks";
import { ITarefa, TarefaService } from "../../shared/services/tarefas/TarefasService";
import { ApiException } from "../../shared/services/api/ErrorException";

export const DashboardApi = () => {

    //utilizando hook useRef para armazenar objeto
    const counterRef = useRef({ counter: 0 });

    //use context é uma funcao hook
    const {nomeDoUsuario, logout} = useUsuarioLogado();

    const [listaObjetoJson, setlistaObjetoJson] = useState<ITarefa[]>([]);

    const handleToggleComplete = useCallback((id: number) => {

        const tarefaToUpdate = listaObjetoJson.find((tarefa) => tarefa.id === id);
        // abaixo se não encontrar a tarefa vai ser false e com a negação ! return true e não altera os dados
        if(!tarefaToUpdate) return;

        TarefaService.updateById(id, {
            ...tarefaToUpdate,
            isCompleted: !tarefaToUpdate.isCompleted,
        })
        .then((result) => {
            if (result instanceof ApiException) {
                alert(result.message);
            } else {
                setlistaObjetoJson(oldLista => {
                    return oldLista.map(oldlistItem => {
                        if (oldlistItem.id === id) return result;
                        return oldlistItem;
                    });
                });
            }
        })
    }, [listaObjetoJson]);

    const handleDelete = useCallback((id: number) => {

        TarefaService.deleteById(id)
        .then((result) => {
            if (result instanceof ApiException) {
                alert(result.message);
            } else {
                setlistaObjetoJson(oldLista => {
                    return oldLista.filter(oldlistItem => oldlistItem.id !== id);
                });
            }
        })
    }, []);

//no hook useEfect utilizamos a funcao then do getAll da promise, no then é preciso passar um callBack em uma arrow function () => {}
    useEffect(() => {
        TarefaService.getAll()
            .then((result) => {
                if (result instanceof ApiException) {
                    alert(result.message);
                } else {
                    setlistaObjetoJson(result);
                }
            });
    }, []);

    const handleInputKeyDownJson: React.KeyboardEventHandler<HTMLInputElement> = useCallback((e) => {
        if (e.key === 'Enter') {

            //trim() é utilizado para remover espaços
            if (e.currentTarget.value.trim().length === 0) return;

            const value = e.currentTarget.value;

            e.currentTarget.value = '';

            //abaixo validacao para se valor já existir não é inserido novamente
            if (listaObjetoJson.some((listItem) => listItem.title === value)) return listaObjetoJson;

            TarefaService.create({ title: value, isCompleted: false })
                .then((result) => {
                    if (result instanceof ApiException) {
                        alert(result.message);
                    } else {      
                        // [...]->spading cria uma nova lista mas utiliza todos os valores que já existem                  
                        setlistaObjetoJson((oldLista) => [...oldLista, result]);
                    }
                });
        }
    }, [listaObjetoJson]);

    return (
        <>
            <p>Dashboard</p>

            <p>{nomeDoUsuario}</p>

            <p>Contador: {counterRef.current.counter}</p>

            <button onClick={() => counterRef.current.counter++}>Somar</button>
            <button onClick={() => console.log(counterRef.current.counter++)}>Log</button>

            <button onClick={logout}>Logout</button>

            <Link to={"/login"}>Login</Link>
            <input type="text" onKeyDown={handleInputKeyDownJson} />
            <p>Lista de Objeto</p>

            <p>{listaObjetoJson.filter((listaObjeto) => listaObjeto.isCompleted).length}</p>
            <ul>
                {listaObjetoJson.map((listItem) => {
                    return <li key={listItem.id}>
                        <input 
                            type="checkbox"
                            checked={listItem.isCompleted}
                            onChange={() => handleToggleComplete(listItem.id)} 
                        />
                        {listItem.title}

                        <button onClick={() => handleDelete(listItem.id)}>Apagar</button>
                    </li>;
                })}
            </ul>
        </>
    );
}