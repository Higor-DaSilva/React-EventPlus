import { useEffect, useState } from "react"
import imgDeletar from "../../assents/img/imgDeletar.png"
import "./Modal.css"
import api from "../../Services/services";

const Modal = (props) => {
    const [comentarios, setComentarios] = useState([])

    const [novoComntario, setNovoComentario] = useState("");

    const [usuarioId, setUsuarioId] = useState("9E88FF81-D572-4CBB-9A40-FBA05EED0EC3")

    async function listarComentarios() {
        try {
            const resposta = await api.get(`ComentariosEventos/ListarSomenteExibe?id=${props.idEvento}`);
            setComentarios(resposta.data);

        } catch (error) {
            console.log(error);

        }
    }

    async function cadastrarComentarios() {
        try {
            await api.post("Comentarios", {
                idUsuario: usuarioId,
                idEvento: props.idEvento,
                descricao: comentarios
            })
        } catch (error) {
            console.error(error);

        }
    }

    async function deletarComentario(idComentario) {
        try {
            await api.delete(`ComentariosEventos/${idComentario}`)
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(() => {
        listarComentarios();
    }, [comentarios])

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
                                        alt='deletar' 
                                        onClick={() => deletarComentario(item.idcomentarioEvento)}/>
                                    <p>{item.descricao}</p>
                                </div>
                            ))}
                            <div>
                                <input type="text" placeholder="Escrever seu comentário..."
                                value={novoComntario}
                                onChange={(e) => setNovoComentario(e.target.value)} />
                                <button onClick={() => cadastrarComentarios()}>
                                    Cadastrar
                                </button>
                            </div>
                        </>
                    )}

                </div>
            </div>
        </>
    )
}

export default Modal;
