
import "./Cadastro.css";
import Botao from "../botao/Botao"

const Cadastro = (props) => {
    return (
        <section className="section_cadastro">
            <form onSubmit={props.funcCadastro} action="" className="layuot_grid form_cadastro">
                <h1>{props.tituloCadastro}</h1>
                <hr />
                <div className="campos_cadastro">
                    <div className="banner_cadastro">
                        <img src={props.img_banner} />
                    </div>
                    <div className="campo_preen">
                        <div className="campo_cad_nome">
                            <label htmlFor=""></label>
                            <input type="text" nome="nome" placeholder={props.nomes}
                                value={props.valorInput}
                                onChange={(e) => props.setValorInput(e.target.value)} />
                        </div>

                        {/* data evento */}
                        <div className="campo_cad_nome" style={{ display: props.visibilidade }}>
                            <input
                                placeholder={props.campo_placeholder}
                                style={{ display: props.visibilidade }}
                                type="date"
                                id="start"
                                name="trip-start"

                                value={props.valorDate}
                                onChange={(e) => props.setValorDate(e.target.value)}
                            />
                        </div>

                        <div className="campo_cad_genero" style={{ display: props.visibilidade }}>
                            <label htmlFor="TiposEventos"></label>
                            <select name="TiposEventos" id=""
                                value={props.valorSelect}
                                onChange={(e) => props.setValorSelect(e.target.value)}>
                                <option value="" disabled selected>tipo evento</option>
                                {props.lista && props.lista.length > 0 && props.lista.map((item) =>
                                    <option value={item.idTipoEvento}>{item.tituloTipoEvento}</option>
                                )}

                            </select>
                        </div>
                        <div className="campo_cad_genero" style={{ display: props.visibilidade }}>
                            <label htmlFor="instituicao"></label>
                            <select name="" id=""
                                value={props.valorSelect2}
                                onChange={(e) => props.setValorSelect2(e.target.value)}
                            >
                                <option selected value="">Senai</option>
                            </select>
                        </div>

                        <div className="campo_cad_nome" style={{ display: props.visibilidade }}>

                            <input
                                type="text"
                                name="descricao"
                                placeholder="Descrição"
                                value={props.valorText}
                                onChange={(e) => props.setValorText(e.target.value)}
                            />
                        </div>

                        <Botao nomeBotao="Cadastrar 👍" />
                    </div>
                </div>
            </form>
        </section>
    )
}

export default Cadastro;