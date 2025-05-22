import Footer from "../../components/footer/Footer"
import Header from "../../components/header/Header";
import Cadastro from "../../components/cadastro/Cadastro"
import Lista from "../../components/lista/Lista";

import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import api from "../../Services/services";

import Banner from "../../assents/img/banner_cadastroEvento.png"
const CadastroEvento = () => {

    // const [cadastroEvento, setCadastroEvento] = useState("");

    //   function alertar(icone, mesagem) {
    //         const Toast = Swal.mixin({
    //             toast: true,
    //             position: "top-end",
    //             showConfirmButton: false,
    //             timer: 3000,
    //             timerProgressBar: true,
    //             didOpen: (toast) => {
    //                 toast.onmouseenter = Swal.stopTimer;
    //                 toast.onmouseleave = Swal.resumeTimer;
    //             }
    //         });
    //         Toast.fire({
    //             icon: icone,
    //             title: mesagem
    //         });
    //     }

    //       async function cadastrarEvento(e) {
    //     e.preventDefault();

    //     if (cadastraoUsuario.trim() !== "") {
    //         try {
    //             api.post("Eventos", { TituloTipoUsuario: tipoUsuario })
    //             alertar("success", "Cadastro realizado com sucesso")
    //             setTipoUsuario("")
    //         } catch (error) {
    //             alertar("error", "Erro! entre em contato com o suporte!")
    //             console.log(error)
    //         }
    //     } else {
    //         alertar("warning", "Preencha o campo")
    //     }

    // }

    return (
        <>
            <Header/>
                <Cadastro
                tituloCadastro = "Cadastro de Evento"
                img_banner = {Banner}
                nomes = "Nome"
                
                />

                <Lista 
                    tituloLista ="Lista de Evento"
                    titulo = "Nome"
                
                />
            <Footer/>
        </>
    )
}

export default CadastroEvento;