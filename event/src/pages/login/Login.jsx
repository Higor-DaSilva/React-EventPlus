import Botao from "../../components/botao/Botao";
import Logo from "../../assents/img/logo1.svg";
import Banner from "../../assents/img/fundo_login.png"
import "./Login.css";
import Swal from 'sweetalert2'
import api from "../../Services/services"
import { useState } from "react";
import { userDecodeToken } from "../../auth/Auth";
import secureLocalStorage from "react-secure-storage"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const navigate = useNavigate();

    async function realizarAutenticacao(e) {
        e.preventDefault();

        const usuario = {
            email: email,
            senha: senha
        }
        if (senha.trim() != "" || email.trim() != "") {
            try {
                const resposta = await api.post("Login", usuario);
                const token = resposta.data.token;

                if (token) {
                    const tokenDecodificado = userDecodeToken(token);
                    //    console.log(tokenDecodificado);

                    secureLocalStorage.setItem("tokenLogin", JSON.stringify(tokenDecodificado))

                    if (tokenDecodificado.tipoUsuario === "normal") {
                        //redirecciona para lista de evento(branca)
                        navigate("/ListagemEvento")
                    } else {
                        //redireciona para cadastro (vermelha)
                        navigate("/Eventos")

                    }
                }


            } catch (error) {
                console.error(error);
                Swal.fire("error!", "Entre em contato com o suporte" , "warning")

            }
        } else {
            Swal.fire('erro!', 'preencha os campos vazios para realizar o login', 'warning');
        }

    }
    return (
        <>

            <main className="mae_de_todas">
                <div className="banner">
                    <img src={Banner} alt="banner do fundo do Login" />
                </div>

                <section className="section_login">
                    <img src={Logo} alt="Logo do Event+" />
                    <form action="" className="form_login" onSubmit={realizarAutenticacao}>

                        <div className="campos_login">
                            <div className="campo_imput">
                                <label htmlFor="email"></label>
                                <input className="email" type="email" name="email" placeholder="usename"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                            </div>
                            <div className="campo_imput">
                                <label htmlFor="senha"></label>
                                <input type="password" name="senha" placeholder="password"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                />

                            </div>
                        </div>
                        <h3 className="mudar_senha">Esqueceu a senha?</h3>
                        <Botao nomeBotao="Login 😁" />
                    </form>
                </section>
            </main>
        </>
    )
}
export default Login;