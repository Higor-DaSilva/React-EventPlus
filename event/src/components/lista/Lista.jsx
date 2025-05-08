import "./Lista.css";
import Editar from "../../assents/img/lapis.png";
import Excluir from "../../assents/img/lixeira.png";



const Lista = (props) => {
    return(
        <>
        <section className="listagem">
            <h1>{`Lista de ${props.tituloLista}`}</h1>
            <hr className="linha_titulo" />
            


            <div className="tabela layout_grid">
                <table>
                    <thead>
                        <tr className="tabela_cabecalho">
                            <th>{props.titulo}</th>
                            <th style={{display:props.visibilidade}}>Tipo Evento</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                        </tr>
                    </thead>
                                {/* <hr className="divi" /> */}
                    <tbody>
                        <tr className="item_lista">
                            <td data-cell={props.titulo}>xxxxxxxxx</td>
                            <td data-cell="Tipo Evento" style={{display:props.visibilidade}} >xxxxxxxxx</td>
                            <td data-cell="Editar"><img src={Editar} alt="" /></td>
                            <td data-cell="Excluir"><img src={Excluir} alt="" /></td>

                        </tr>


                    </tbody>
                </table>
            </div>


        </section>
        
        </>
    )
}


export default Lista;