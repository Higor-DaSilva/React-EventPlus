import "./Botao.css"

const Botao = (promps) => {
    return(
        <button className="botao" type="submit">{promps.nomeBotao}</button>
    )
}

export default Botao;