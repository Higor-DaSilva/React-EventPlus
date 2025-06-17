import "./Header.css";
import Logo from "../../assents/img/logo1.svg";
import Admin from "../../assents/img/Admin.png"
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import secureLocalStorage from "react-secure-storage";
const Header = (props) => {

     async function realizarLogOut(e) {
        Swal.fire({
            title: 'Sair?',
            text: "Essa ação poderá ser desfeita!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#B51D44',
            cancelButtonColor: '#000000',
            confirmButtonText: 'Sim, Sair!',
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const resposta = secureLocalStorage.removeItem("tokenLogin");
                console.log(resposta);

                Swal.fire("success", "Até Logo!");


                Navigate("/home")
            }
        }).catch(error => {
            console.log(error);
            Swal.fire("error", "Erro ao Sair");
        })
    }


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
                    <img className="admin"  onClick={() => realizarLogOut()} src={Admin} alt="Icone" style={{ display: props.visibilidade }} />
                </nav>

                <div className="login" style={{ display: props.botao_logar }}>
                    <Link href="" to="/" className="logar">Logar</Link>
                </div>

            </div>
        </header>
    )
}
export default Header;