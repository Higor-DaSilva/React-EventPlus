import "./Lista.css";
import Editar from "../../assents/img/lapis.png";
import Excluir from "../../assents/img/lixeira.png";



const Lista = (props) => {
    return (
        <>
            <section className="listagem">
                <h1>{`Lista de ${props.tituloLista}`}</h1>
                <hr className="linha_titulo" />



                <div className="tabela layout_grid">
                    <table>
                        <thead>
                            <tr className="tabela_cabecalho">
                                <th className="left">{props.titulo}</th>
                                <th className="left" style={{ display: props.visibilidade }}>Tipo Evento</th>
                                <th className="right">Editar</th>
                                <th className="right">Excluir</th>
                            </tr>
                        </thead>
                        {/* <hr className="divi" /> */}
                        <tbody>
                            {props.lista && props.lista.length > 0 ? (
                                props.lista.map((item) => (

                                    <tr className="item_lista" key={props.tipoLista == "tipoEvento" ? item.idTipoEvento : item.idTipoUsuario}>
                                        <td className="left" data-cell={props.titulo}>o
                                            {props.tipoLista == "tipoEvento" ? item.tituloTipoEvento : item.tituloTipoUsuario}
                                        </td>
                                        <td className="left" data-cell="Tipo Evento" style={{ display: props.visibilidade }} >xxxxxxxxx</td>
                                        <td className="right" data-cell="Editar">
                                            <img
                                                src={Editar}
                                                alt="caneta"
                                                onClick={() => (props.editar(item))}
                                            />
                                        </td>
                                        <td className="right" data-cell="Excluir">
                                            <img src={Excluir}
                                                alt="lixeira"
                                                onClick={() => (props.excluir(item))}
                                            />
                                        </td>

                                    </tr>
                                ))
                            ) : (
                                <td colSpan="4">Nenhum gênero foi encontrado.</td>
                            )
                            }



                        </tbody>
                    </table>
                </div>


            </section>

        </>
    )
}


export default Lista;