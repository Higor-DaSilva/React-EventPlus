import Footer from "../../components/footer/Footer"
import Header from "../../components/header/Header";
import Comentario from "../../assents/img/comentario.png"
import Decricao2 from "../../assents/img/informacoes2.png";
import Toggle from "../../components/toggle/Toggle";
import "./ListagemEvento.css";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2'
import api from "../../Services/services";

function ListagemEvento() {
    const [listaEventos, setListaEventos] = useState([]);
    const [valorSelectEventos, setvalorSelectEventos] = useState("");



    async function listarEvento() {
        try {
            const eventoListado = await api.get("Eventos");
            setListaEventos(eventoListado.data);

        } catch (error) {
            console.log(error);
        }
    }

    async function descricaoLista(id){
         Swal.fire({
                    title: 'Descrição do Evento',
                    text: id.Eventos?.descricao,
                    icon: 'info',
                    confirmButtonText: 'Fechar'
                });
    }

    useEffect(() => {
        listarEvento();
    }, []);

    return (
        <>
            <Header />
            <section className="ListagemEvento">
                <h1>Eventos</h1>
                <hr className="linha_titu" />


                <div className="tabela_listagem layout_grid">

                    <div className="left  seletor">
                        <label htmlFor="eventos"></label>
                        <select name="eventos" id=""
                            value={valorSelectEventos}
                            onChange={(e) => setvalorSelectEventos(e.target.value)}>

                            <option value="" disabled>
                                Evento
                            </option>
                            {listaEventos.map((item) => (
                                <option value={item.idEvento}>{item.nomeEvento}</option>
                            ))}
                        </select>
                    </div>
                    <table>
                        <thead>
                            <tr className="cabecalho_listagem ">
                                <th className="left">Título</th>
                                <th className="left">Data do Evento</th>
                                <th className="left">Tipo Evento</th>
                                <th className="right">Descrição</th>
                                <th className="right">Comentários</th>
                                <th className="right">Participar</th>
                            </tr>

                        </thead>
                        {/* <hr className="divi" /> */}
                        <tbody>
                            {listaEventos.map((item) => (
                                <tr className="item_listagem espaco">
                                    <td className="left" data-cell="Título">
                                        {item.nomeEvento}
                                    </td>
                                    <td className="left" data-cell="Data do Evento">
                                        {new Date(item.dataEvento).toLocaleDateString('pt-BR')}
                                    </td>
                                    <td className="left" data-cell="Tipo Evento">
                                        {item.tiposEvento?.tituloTipoEvento}
                                    </td>
                                    <td className="right" data-cell="Descrição">
                                        <img src={Decricao2}
                                            alt=""
                                            onClick={descricaoLista}
                                            />
                                </td>   
                                    <td className="right" data-cell="Comentários">
                                        <img src={Comentario}
                                            alt="" /></td>
                                    
                                    <td className="right" data-cell="Participar"><Toggle /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>


            <Footer />
        </>
    );
}

export default ListagemEvento;