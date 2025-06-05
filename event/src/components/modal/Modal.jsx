import imgDeletar from "../../assents/img/imgDeletar.png"
import "./Modal.css"

const Modal = (props) => {
    return (
        <>
            <div className='model_overlay' onClick={props.fecharModal}></div>
            <div className='model'>
                <h1>{props.titulo}</h1>
                <div className='model_conteudo'>
                    {props.tipoModel == "descricaoEvento" ? (   
                        <p>{props.descricao}</p>
                    ) : (
                        <>
                            {comentarios.map((item) => (
                                <div key={item.idcomentarioEvento}>
                                    <strong>{item.usuario.nomeUsuario}</strong>
                                    <img src={imgDeletar}
                                        alt='deletar' />
                                    <p>{item.descricao}</p>
                                </div>
                            ))}
                            <div>
                                <input type="text" placeholder="Escrever seu comentário..."/>
                                <button>Cadastrar</button>
                            </div>
                        </>
                    )}

                </div>
            </div>
        </>
    )
}

export default Modal;
