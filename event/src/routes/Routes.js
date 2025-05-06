import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/login/Login"
import TipoEvento from "../pages/tipoEvento/TipoEvento"
import CadastroEvento from "../pages/cadastroEvento/CadastroEvento"
import CadastroUsuario from "../pages/cadastroUsuario/CadastroUsuario"
const Rotas = () => {
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element = {<Login/>} exact/>
            <Route path="/TipoEvento" element = {<TipoEvento/>}/>
            <Route path="/CadastroEvento" element = {<CadastroEvento/>}/>
            <Route path="/CadastroUsuario" element = {<CadastroUsuario/>}/>

        </Routes>
        </BrowserRouter>
    )
}

export default Rotas;