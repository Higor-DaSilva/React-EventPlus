import Footer from "../../components/footer/Footer"
import Header from "../../components/header/Header";
import Cadastro from "../../components/cadastro/Cadastro";

import { useEffect, useState } from "react";
import api from "../../Services/services";

import Swal from 'sweetalert2'

import Banner from "../../assents/img/banner_tipoEvento.png"
import Lista from "../../components/lista/Lista";

const TipoEvento = () => {

    const [tiposEventos, setTiposEventos] = useState("")
    const [listaTiposEventos, setListaTiposEventos] = useState([]);


    function alertar(icone, mesagem) {
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
            title: mesagem
        });
    }

    async function cadastrarTipoEvento(e) {
        e.preventDefault();
        if (tiposEventos.trim() !== "") {
            try {
                await api.post("TiposEventos", { TituloTipoEvento: tiposEventos });
                alertar("success", "Cadastro realizado com sucesso")
                setTiposEventos("");

            } catch (error) {
                alertar("error", "Erro! entre em contato com o suporte!")
                console.log(error)
            }
        } else {
            alertar("warning", "Preencha o campo")

        }
    }

    async function listarTipoEvento() {
        try {
            const resposta = await api.get("TiposEventos");

            setListaTiposEventos(resposta.data);
        } catch (error) {
            console.log(error);

        }
    }

    async function editarTipoEvento(tipoevento) {
        const { value: novoTipoEvento } = await Swal.fire({
            title: "Modifique o tipo do evento",
            input: "text",
            inputLabel: "Novo tipo do evento",
            inputValue: tiposEventos.tituloTipoEvento,
            showCancelButton: true,
            confirmButtonColor: '#b51d44',
            cancelButtonColor: '#b5b5b5',
            resultButtonColor: '#b51d44',
            confirmButtonText: 'Sim, modificar',
            cancelButtonText: 'Cancelar',
            inputValidator: (value) => {
                if (!value) {
                    return "O campo precisa ser preenchido!";
                }
            }
        });
        if (novoTipoEvento) {
            try {
                api.put(`TiposEventos/${tipoevento.idTipoEvento}`, { tituloTipoEvento: novoTipoEvento });
                Swal.fire(`O gênero modificado ${novoTipoEvento}`);
            } catch (error) {
                console.log(error);
            }
        }

    }

    async function excluirTipoEvento(id) {

        Swal.fire({
            title: 'Tem certeza?',
            text: "Você não poderá desfazer esta ação!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#b51d44',
            cancelButtonColor: '#b5b5b5',
            confirmButtonText: 'Sim, apagar!',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                api.delete(`TiposEventos/${id.idTipoEvento}`);
                alertar("success", "Gênero Excluido!")
            }
        }).catch(error => {
            console.log(error);
            alertar("error", "Erro ao Excluir!");
        });
        // try {
        //     api.delete(`TiposEventos/${id.idTipoEvento}`);
        //     alert("apagou")
        // } catch (error) {
        //     console.log(error);

        // }
    }

    useEffect(() => {
        listarTipoEvento();
    }, [listaTiposEventos])

    return (
        <>
            <Header />
            <Cadastro
                tituloCadastro="Cadastro Tipo de Eventos"
                img_banner={Banner}
                nomes="Título"
                visibilidade="none"
                funcCadastro={cadastrarTipoEvento}
                valorInput={tiposEventos}
                setValorInput={setTiposEventos}
            />
            <Lista
                tituloLista="Lista Tipo de Evento"
                titulo="titulo"
                visibilidade="none"
                lista={listaTiposEventos}
                tipoLista="tipoEvento"

                editar={editarTipoEvento}
                excluir={excluirTipoEvento}

            />
            <Footer />
        </>
    )
}

export default TipoEvento;