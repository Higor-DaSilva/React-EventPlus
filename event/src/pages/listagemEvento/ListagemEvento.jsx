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

function ListagemEvento() {
    const [listaEventos, setListaEventos] = useState([]);
    const [valorSelectEventos, setvalorSelectEventos] = useState("");
    const [tipoModal, setTipoModal] = useState("");
    const [dadosModal, setDadosModal] = useState({});
    const [modalAberto, setModalAberto] = useState(false);

    const [filtroData, setFiltroData] = useState(["todos"])

    const [usuarioId, setUsuarioId] = useState("9E88FF81-D572-4CBB-9A40-FBA05EED0EC3")

    async function listarEvento() {
        try {
            const eventoListado = await api.get("Eventos");
            const todosOsEventos = eventoListado.data

            const respostapresenca = await api.get("PresencaEventos/ListarMinhas/" + usuarioId)
            const minhasPresencas = respostapresenca.data

            const eventosComPresenca = todosOsEventos.map((atualEvento) => {
                const presenca = minhasPresencas.find(p => p.idEvento === atualEvento.idEvento);

                return {
                    //as informações tanto de evento quanto de eventos que possuem presença
                    ...atualEvento, possuipresenca: presenca?.situacao === true, idPresenca: presenca?.idPresencaEvento || null
                }
            })

            setListaEventos(eventosComPresenca);


        } catch (error) {
            console.log(error);
        }
    }

    // async function descricaoLista(id) {
    //     Swal.fire({
    //         title: 'Descrição do Evento',
    //         text: id,
    //         icon: 'info',
    //         confirmButtonText: 'Fechar'
    //     });
    // }

    // async function comentarios(id) {
    //     Swal.fire({
    //         title: 'Descrição do Evento',
    //         text: id,
    //         icon: 'success',
    //         confirmButtonText: 'Fechar'
    //     });
    // }

    useEffect(() => {
        listarEvento();
    }, []);

    function abrirModal(tipo, dados) {
        setModalAberto(true)
        setTipoModal(tipo)
        setDadosModal(dados)
    }

    function fecharModal() {
        setModalAberto(false);
        setDadosModal({});
        setTipoModal("");
    }

    async function manipularPresenca(idEvento, presenca, idPresenca) {
        try {
            if (presenca && idPresenca != "") {
                //atualização: situação para FALSE
                await api.put(`PresencasEventos/${idPresenca}`, { situacao: false })
                Swal.fire('Removido!', 'Sua presença foi removida.', 'success')
            } else if (idPresenca != "") {
                //atualização: situação para True
                await api.put(`PresencasEventos/${idPresenca}`, { situacao: true })
                Swal.fire('Removido!', 'Sua presença foi confirmada.', 'success')
            } else {
                //cadastrar uma nova presença
                await api.post("PresencaEventos", { situacao: true, idUsuario: usuarioId, idEvento: idEvento })
                Swal.fire('Removido!', 'Sua presença foi removida.', 'success')
            }
            listarEvento();
        } catch (error) {
            console.log(error);

        }
    }

    function filtrarEvento() {
        const hoje = new Date();

        if (filtroData.includes("todos")) return true;
        if (filtroData.includes("futuros") && dataEvento > hoje) return true;
        if (filtroData.includes("passados") && dataEvento < hoje) return true;

        return false;
    }

    return (
        <>
            <Header />
            <section className="ListagemEvento">
                <h1>Eventos</h1>
                <hr className="linha_titu" />


                <div className="tabela_listagem layout_grid">

                    <div className="left  seletor">
                        <select onChange={(e) => setFiltroData([e.target.value])}>
                            <option value="todos" selected>Todos os eventos</option>
                            <option value="futuros">somente futuros</option>
                            <option value="passados">somente passados</option>
                        </select>
                    </div>
                    <table>
                        <thead>
                            <tr className="cabecalho_listagem espaco">
                                <th className="left">Título</th>
                                <th className="left">Data do Evento</th>
                                <th className="left">Tipo Evento</th>
                                <th className="right">Descrição</th>
                                <th className="right">Comentários</th>
                                <th className="right">Participar</th>
                            </tr>

                        </thead>
                        <br />
                        <br />
                        {/* <hr className="divi" /> */}
                        <tbody>

                            {listaEventos.length > 0 ? (


                                filtrarEventos() && filtrarEvento().map((item) => (
                                    <tr className="item_listagem separa">
                                        <td className="left" data-cell="Título">
                                            {item.nomeEvento}
                                        </td>
                                        <td className="left" data-cell="Data do Evento">
                                            {/* {new Date(item.dataEvento).toLocaleDateString('pt-BR')} */}
                                            {format(item.dataEvento, "dd/MM/yy")}
                                        </td>
                                        <td className="left" data-cell="Tipo Evento">
                                            {item.tiposEvento?.tituloTipoEvento}
                                        </td>
                                        <td className="right" data-cell="Descrição">
                                            <img src={Decricao2}
                                                alt=""
                                                // onClick={() => descricaoLista(item.descricao)}
                                                onClick={() => abrirModal("descricaoEvento", { descricao: item.descricao })}
                                            />
                                        </td>
                                        <td className="right" data-cell="Comentários">
                                            <img src={Comentario}
                                                alt=""
                                                onClick={() => abrirModal({ idvento: item.idEvento })}
                                            // onClick={() => comentarios(item.idComentarioEvento)}
                                            />

                                        </td>

                                        <td className="right" data-cell="Participar">
                                            <Toggle
                                                presenca={item.possuipresenca}
                                                manipular={() => manipularPresenca(item.idEvento, item.possuipresenca, item.idPresenca)} />
                                            {/* <label className="switch">
                                                <input type="checkbox"
                                                checked={item.possuipresenca}
                                                onChange={() => manipularPresenca(item.idEvento, item.possuipresenca, item.idPresenca)} />
                                                <span className="slider"></span>
                                            </label> */}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <td className="mensagem" colSpan="4">Nenhum gênero foi encontrado.</td>

                            )}
                        </tbody>
                    </table>
                </div>
            </section>


            <Footer />

            {modalAberto && (

                <Modal
                    titulo={tipoModal == "descricaoEvento" ? "Descrição do Evento" : "Comentário"}
                    tipoModel={tipoModal}

                    idEvento={dadosModal.idEvento}
                    descricao={dadosModal.descricao}

                    fecharModal={fecharModal}
                />
            )}
        </>
    );
}

export default ListagemEvento;