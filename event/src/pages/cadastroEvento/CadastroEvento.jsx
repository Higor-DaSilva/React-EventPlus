import Footer from "../../components/footer/Footer"
import Header from "../../components/header/Header";
import Cadastro from "../../components/cadastro/Cadastro"
import Lista from "../../components/lista/Lista";

import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import api from "../../Services/services";

import Banner from "../../assents/img/banner_cadastroEvento.png"
const CadastroEvento = () => {
    const [evento, setEvento] = useState("");
    const [listaEvento, setListaEvento] = useState([])
    const [tipoevento, setTipoEvento] = useState("");
    const [listaTipoEvento, setListaTipoEvento] = useState([])
    const [dataevento, setDataEvento] = useState("");
    const [descricao, setDescricao] = useState("");
    const [instituicao, setInstituicao] = useState("B4F736FD-96F5-48EE-86F5-9B9AA85D716A");

    function alertar(icone, mensagem) {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: icone,
            title: mensagem
        });
    }

    async function listarTipoEvento() {
        try {
            const resposta = await api.get("TiposEventos");
            setListaTipoEvento(resposta.data);
        } catch (error) {
            console.log(error);

        }

    }


    async function listarEvento() {
        try {
            const resposta = await api.get("Eventos")
            setListaEvento(resposta.data)
        } catch (error) {
            console.log(error);

        }
    }

    async function cadastrarEvento(evt) {
        evt.preventDefault();
        if (evento.trim() != "") {
            try {
                await api.post("Eventos", { nomeEvento: evento, idTipoEvento: tipoevento, dataEvento: dataevento, descricao: descricao, idInstituicao: instituicao });
                alertar("success", "Cadastro realizado com sucesso!");
                setEvento("");
                setDataEvento();
                setDescricao("");
                setTipoEvento("");

            } catch (error) {
                alertar("error", "Entre em contato com o suporte")
            }
        } else {
            alertar("error", "Preencha o campo vazio")

        }
    }

    useEffect(() => {
        listarEvento();
        listarTipoEvento();
    }, [listaEvento]);

    return (
        <>
            <Header nomeUsu="Administrador" />
            <Cadastro
                tituloCadastro="Cadastro de Evento"
                img_banner={Banner}
                nomes="Nome"

                funcCadastro={cadastrarEvento}

                valorInput={evento}
                setValorInput={setEvento}

                valorSelect={tipoevento}
                setValorSelect={setTipoEvento}

                valorSelect2={instituicao}
                setValorSelect2={setInstituicao}

                valorDate={dataevento}
                setValorDate={setDataEvento}

                valorText={descricao}
                setValorText={setDescricao}

                lista={listaTipoEvento}
            />

            <Lista
                tituloLista="Lista de Evento"
                titulo="Nome"
                lista={listaEvento}
                tipoLista = "cadastroEvento"
            />
            <Footer />
        </>
    )
}

export default CadastroEvento;