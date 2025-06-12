import React, { useState } from 'react'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'

import Banner from "../../assents/img/cadastroUsuario.png"



const CriacaoUsuario = () => {

    const [criacao, setCriacao] = useState([]);

    return (
        <>
            <Header />

            <section className='section_cadastro'>
                <form  action="" className='layout_grid form_cadastro'>
                    <h1>Cadastrar Usuário</h1>
                    <hr/>
                    <div className='campos_cadastro'>
                        <div className='banner_cadastro'>
                            <img src={Banner} alt="" />
                        </div>
                        <div className="campo_preen">
                        <div className="campo_cad_nome">
                            <label htmlFor=""></label>
                            <input type="text" nome="nome" placeholder="Nome"/>
                        </div>
                        
                        
                        <div className="campo_cad_nome">
                            <label htmlFor=""></label>
                            <input type="email" nome="nome" placeholder="email"/>
                        </div>
                       
                        <div className="campo_cad_nome">
                            <label htmlFor=""></label>
                            <input type="password" nome="nome" placeholder="senha"/>
                        </div>
                        <div className='campo_cad_nome'>
                            {criacao.map((item) => (
                            <select  >
                            <option value={item.idTipoUsuario}>{item.tituloTipoUsuario}</option>
                            </select>
                            ))}
                        </div>
                    </div>
                    </div>

                </form>
            </section>


            <Footer />
        </>
    )
}

export default CriacaoUsuario;
