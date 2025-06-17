//importa funções do React necessárias para criar e usar context
import { createContext, useState, useContext, children } from "react";
import secureLocalStorage from 'react-secure-storage'

//criar o context de autenticação, que vai permitir compoarilhar dados entrre componentes
const AuthContext = createContext();

//Esse componente vai envolver a aplicação (ou parte dela) e fonecer para os filhos 
//Procider = prover/dar
export const AuthProvider = ({ children }) => {
    //cria um estado que guarda os dados do usuário logado
    const [usuario, setUsuario] = useState(() => {
        const usuarioSalvo = secureLocalStorage.getItem("tokenLogin");
        return usuarioSalvo ? JSON.parse(usuarioSalvo) : undefined;
    });


    return (
        //O authContext.Provider permite que qualquer componente dentro dele acesse p `usuario` e `setUsuario`
        //Faz com que qualquer componente que esteja dentro de <AuthProvider> consiga acessar o valor {usuario, setUsuario} usando
        //  o hook useAuth
        <AuthContext.Provider value={{ usuario, setUsuario }}>
            {children}
        </AuthContext.Provider>
    );
};

//esse hook personalizado facilita o acesso ao context dentro de qualquer componente 
//USAR!!!
export const useAuth = () => useContext(AuthContext);