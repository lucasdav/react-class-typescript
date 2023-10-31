import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputLogin } from "./components/InputLogin";
import { ButtonLogin } from "./components/ButtonLogin";
import { useUsuarioLogado } from "../../shared/hooks";

export const Login = () => {
//useState utilizado para guardar valor/estado de um elemento, a cada change será reexecutado todo o componente
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

//o useEffect é utilizado para definir o que será realizado quando o componente for carregado do zero
//deve ser passado dois paramentros: uma funcao e um segundo parametro exemplo um array vazio caso não tenha dependencia
//pode ser utilizado para chamada de api
    useEffect(() => {
        if (window.confirm('você é do sexo masculino')) {
            console.log('Masculino')
        } else {
            console.log('Feminino')
        }    
    }, []);

//exemplo abaixo será executada a function toda vez que for alterado o email e o password
//pode ser utilizado por exemplo numa chamada de listagem de api onde no parametro de dependecia colocaria a pagina da lista
    useEffect(() => {
        console.log(email)
        console.log(password)
    }, [email, password]);

    // const navigate = useNavigate();

    // const handleClick = () => {
    //     navigate("/pagina-inicial")
    // }

//useMemo pode ser utilizado para armazenar calculos
// useMemo é utilizado para definir uma funcao que será executada e tera um retorno
// no useMemo é passado uma function factory e um parametro dependencia para toda vez que for altreada o useMemo será executado
    const emailLength = useMemo(() => {
        return email.length;
    }, [email]);

//hook useRef utilizado para armazenar valores dentro de uma variavel e esses valores não alterados conforme o componente é renderizado
// no useRef o valor armazenado pode ser alterado, caso componente seja destruido o valor será mantido no useRef
// abaixo estamos iniciando um input com valor null
     const inputPasswordRef = useRef<HTMLInputElement>(null);

//useCallback pode ser utilizado para armazenar funções, espera tambem dois parametros uma funcao e uma dependencia
    const handleEntrar = useCallback(() => {
        console.log(email)
        console.log(password)

        if (inputPasswordRef !== null) {
            inputPasswordRef.current?.focus()
        }
    }, [email, password]);

    const {nomeDoUsuario} = useUsuarioLogado();

    return (
        <div>
            <form>
                <p>Quantidade de caracteres no email: {emailLength}</p>
                <p>{nomeDoUsuario}</p>
                
                <InputLogin
                    label="Email"
                    value={email}
                    onChange={newValue => setEmail(newValue)}
                    onPressEnter={() => inputPasswordRef.current?.focus()}
                />
                <InputLogin
                    label="Senha"
                    value={password}
                    ref={inputPasswordRef}
                    onChange={newValue => setPassword(newValue)}
                    type="password"
                />

                {/* <label>
                    <span>Senha</span>
                    <input 
                        type="password" 
                        value={password} 
                        ref={inputPasswordRef}
                        onChange={e => setPassword(e.target.value)}
                    />
                </label> */}

                <ButtonLogin 
                    type="button" 
                    onClick={handleEntrar}
                >Entrar
                </ButtonLogin>
            </form>
        </div>

        
        // <div>
        //     Login
        //     <button onClick={handleClick} >Página Inicial</button>
        // </div>
    );
}