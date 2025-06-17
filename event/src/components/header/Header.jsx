import "./Header.css";
import Logo from "../../assents/img/logo1.svg";
import Admin from "../../assents/img/Admin.png"
import {Link} from "react-router-dom";
const Header = (props) => {
    return (
        <header>
            <div className="layout_grid cabecalho">
                {/*Estou a redeirecionar ao clickar na logo */}
            <Link to="/">
            <img src={Logo} alt="Logo do Event+" />
            </Link>
            <nav className="nav_header">
              <Link style={{ display: props.visibilidade2 }} to="/Tipoevento" className="link_header" href="">Home</Link>
              <Link style={{ display: props.visibilidade2 }} to="/Eventos" className="link_header" href="">Eventos</Link>
              <Link style={{ display: props.visibilidade2 }} to="/TipoUsuario" className="link_header" href="">Usuários</Link>
              <Link style={{ display: props.visibilidade2 }} to="/Contatos" className="link_header" href="">Contatos</Link>
            </nav>
            
            {/* <nav className="nav_header">
              <Link to="/ListagemEvento" className="link_header" href="">Administrador</Link>
            </nav>
              <img className="admin" src={Admin} /> */}
              <nav className="nav_img" style={{ display: props.visibilidade }}>
                    <Link href="" className="link_header" to="/" >{props.user}</Link>
                    <img className="admin" src={Admin} alt="Icone" style={{ display: props.visibilidade }} />
                </nav>

                <div className="login" style={{ display: props.botao_logar }}>
                    <Link href="" to="/" className="logar">Logar</Link>
                </div>

            </div>
        </header>
    )
}
export default Header;