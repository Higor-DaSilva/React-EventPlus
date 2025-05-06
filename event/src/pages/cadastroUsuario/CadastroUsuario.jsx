import Footer from "../../components/footer/Footer"
import Header from "../../components/header/Header";
import Cadastro from "../../components/cadastro/Cadastro"

import Banner from "../../assents/img/banner_cadastroUsuario.png"
const CadastroUsuario = () => {
    return (
        <>
            <Header/>
                <Cadastro
                tituloCadastro = "Cadastro Tipo de Usuário"
                img_banner = {Banner}
                nomes = "Título"
                visibilidade ="none"
                
                />
            <Footer/>
        </>
    )
}

export default CadastroUsuario;