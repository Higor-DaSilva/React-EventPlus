import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/login/Login"
import TipoEvento from "../pages/tipoEvento/TipoEvento"
import CadastroEvento from "../pages/cadastroEvento/CadastroEvento"
import CadastroUsuario from "../pages/cadastroUsuario/CadastroUsuario"
import ListagemEvento from "../pages/listagemEvento/ListagemEvento"
import Usuario from "../pages/criacaoUsuario/CriacaoUsuario"

import Home from "../pages/home/Home"
import { useAuth, navigate } from "../contexts/AuthContext";

const Privado = (props) => {
    const { usuario } = useAuth();
    //toke, idUsuario, TipoUsuario

    //se não tiver autenticado, manda para login
    if (!usuario) {
        return <navigate to="/" />;
    }
    //se o tipo do usuario nao for o permitido, bloqueia
    if (usuario.tipoUsuario !== props.tipoPermitido) {
        //ir para a tela de nao encontrado
        return <navigate to="/" />;
    }

    //senao, renderiza o componente passado
    return <props.Item />

};

const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} exact />
                <Route path="/TipoEvento" element={<Privado tipoPermitido="admin" Item={TipoEvento} />} />
                <Route path="/Eventos" element={< Privado tipoPermitido="admin" Item={CadastroEvento} />} />
                <Route path="/TipoUsuario" element={<Privado tipoPermitido="admin" Item={CadastroUsuario} />} />
                <Route path="/ListagemEvento" element={<Privado tipoPermitido="aluno" Item={ListagemEvento} />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/Usuario" element={<Usuario />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;