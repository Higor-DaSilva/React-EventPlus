import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/login/Login"
import TipoEvento from "../pages/tipoEvento/TipoEvento"
import CadastroEvento from "../pages/cadastroEvento/CadastroEvento"
import CadastroUsuario from "../pages/cadastroUsuario/CadastroUsuario"
import ListagemEvento from "../pages/listagemEvento/ListagemEvento"
const Rotas = () => {
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element = {<Login/>} exact/>
            <Route path="/TipoEvento" element = {<TipoEvento/>}/>
            <Route path="/Eventos" element = {<CadastroEvento/>}/>
            <Route path="/TipoUsuario" element = {<CadastroUsuario/>}/>
            <Route path="/ListagemEvento" element = {<ListagemEvento/>}/>
        </Routes>
        </BrowserRouter>
    )
}

export default Rotas;