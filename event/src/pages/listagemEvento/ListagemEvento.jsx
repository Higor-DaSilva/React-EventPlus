import Footer from "../../components/footer/Footer"
import Header from "../../components/header/Header";
import Comentario from "../../assents/img/comentario.png"
import Decricao2 from "../../assents/img/informacoes2.png";
import Toggle from "../../components/toggle/Toggle";
import "./ListagemEvento.css";
import { useState, useEffect, } from "react";
import Swal from 'sweetalert2'
import api from "../../Services/services";
import { format } from "date-fns";
import Modal from "../../components/Modal/Modal";

const ListagemEventos = (props) => {

    const [listaEvento, setListaEvento] = useState([])
    // const [verEvento, setVerEventos] = useState([])
    const [tipoModal, setTipoModal] = useState("")
    const [dadosModal, setDadosModal] = useState([])

    const [modalAberto, setModalAberto] = useState(false)

    const [filtro, setFiltro] = useState(["todos"])
    const [usuarioId, setUsuarioId] = useState("B2381F43-9D74-400D-B3ED-FD05D20E9885")

    async function listarEventos() {
        try {
            //pego o eventos em geral
            const resposta = await api.get("eventos");
            const todosOsEventos = resposta.data;
            const respostaPresencas = await api.get("PresencasEventos/ListarMinhas/" + usuarioId)
            const minhasPresencas = respostaPresencas.data;

            const eventosComPresencas = todosOsEventos.map((atualEvento) => {
                const presenca = minhasPresencas.find(p => p.idEvento === atualEvento.idEvento);
                return {
                    ...atualEvento,

                    possuiPresenca: presenca?.situacao === true,
                }
            })

            setListaEvento(eventosComPresencas)


        } catch (error) {
            console.error("Erro ao buscar eventos:", error);
        }
    }


    useEffect(() => {
        listarEventos();
    }, [])

    function abrirModal(tipo, dados) {
        //Tipo de modal, dados do modal 
        setModalAberto(true)
        setDadosModal(dados);
        setTipoModal(tipo);
    }

    function fecharModal() {
        setModalAberto(false);
        setDadosModal({})
        setTipoModal("")
    }

    async function manipularPresenca(idEvento, presenca, IdPresencaEvento) {
        console.log("chamando manipular");
        console.log('idEvento:', idEvento);
        console.log('idPresenca:', IdPresencaEvento);
        console.log('presenca:', presenca);

        try {
            if (presenca && IdPresencaEvento !== "") {
                // Atualiza: situação para false (remover presença)
                await api.put(`PresencasEventos/${IdPresencaEvento}`, { situacao: false });
                Swal.fire('Removido!', 'Sua presença foi removida.', 'success');
            } else if (IdPresencaEvento !== "") {
                // Atualiza: situação para true (confirmar presença)
                await api.put(`PresencasEventos/${IdPresencaEvento}`, { situacao: true });
                Swal.fire('Confirmado!', 'Sua presença foi confirmada.', 'success');
            } else {
                // Cria nova presença
                await api.post("PresencasEventos", { situacao: true, idUsuario: usuarioId, idEvento: idEvento });
                Swal.fire('Confirmado!', 'Sua presença foi confirmada.', 'success');
            }
        } catch (error) {
            console.error(error);
            Swal.fire('Erro!', 'Algo deu errado ao manipular presença.', 'error');
        }
    }


    function filtrarEventos() {
        const hoje = new Date();
        return listaEvento.filter(evento => {
            const dataEvento = new Date(evento.dataEvento);

            if (filtro.includes("todos")) return true;
            if (filtro.includes("futuros") && dataEvento > hoje) return true;
            if (filtro.includes("passados") && dataEvento < hoje) return true;
            return false;
        })
    }

    return (
        <>
            <Header adm="Alunos" />
            <main className="listaEventos layout_grid">
                <section className="listagemEventos" id="">
                    <h1>Eventos</h1>
                    <hr />


                    <div className="tabela_eventos">

                        <select className="select"
                            value={props.valorSelect}
                            onChange={(e) => setFiltro(e.target.value)}
                        >
                            <option value="Todos" selected>Todos os Eventos</option>

                            <option value="Futuros" selected>Somente Futuros</option>

                            <option value="Passados" selected>Somente Passados</option>


                        </select>

                        <table>
                            <thead>
                                <tr className="table_eventos">
                                    <th>Titulo</th>
                                    <th>Data do Evento</th>
                                    <th>Tipo Eventos</th>
                                    <th>Descriçao</th>
                                    <th>Comentarios</th>
                                    <th>Participar</th>
                                </tr>
                            </thead>

                            <tbody>
                                {listaEvento.length > 0 ? (
                                    filtrarEventos() && filtrarEventos().map((item) => (

                                        <tr key={item.idPresencaEvento}className="item_listaEventos">
                                            <td data-cell="Nome">{item.nomeEvento}</td>
                                            <td data-cell="Data">{format(item.dataEvento, "dd/MM/yyyy")}</td>
                                            <td data-cell="Tipo Evento">{item.tiposEvento.tituloTipoEvento}</td>

                                            <td data-cell="descricao">
                                                <button className="icon" onClick={() =>
                                                    abrirModal("descricaoEvento", { descricao: item.descricao })}>
                                                    <img src={Decricao2} alt="descricao" />
                                                </button></td>

                                            <td data-cell="comentario">
                                                <button className="icon" onClick={() => abrirModal("comentarios",
                                                    { idEvento: item.idEvento })}>
                                                    <img src={Comentario} alt="balao" />
                                                </button>
                                            </td>

                                            <td data-cell="botao"><Toggle presenca={item.possuiPresenca}
                                                manipular={() => manipularPresenca(item.idEvento, item.possuiPresenca, item.iddPresencaEvento)
                                                } /></td>
                                        </tr>
                                    )
                                    )
                                )
                                    : <p>Nao ah eventos</p>

                                }
                            </tbody>


                        </table>
                    </div>


                </section>
            </main>

            <Footer />

            {modalAberto && (
                <Modal
                    titulo={tipoModal == "descricaoEvento" ? "Descriçao do Evento" : "Comentarios"}
                    tipoModel={tipoModal}
                    idEvento={dadosModal.idEvento}
                    descricao={dadosModal.descricao}
                    fecharModal={fecharModal}
                />
            )}

        </>
    )

}
export default ListagemEventos;