import './MenuAddInimigo.css';
import FormAddInimigo from './FormAddInimigo';
import React, { useState, useEffect } from 'react';

export default function MenuAddInimigo() {

    const [isExpanded, setIsExpanded] = useState();

    const adicionarAoGrupo = (event) => {
        event.preventDefault();
        setIsExpanded(false);
    }

    return (
        <div className="menu-add-inimigo">
            <div className="menu-add-inimigo header">
                <h1>Adicionar Inimigo</h1>
            </div>
            {isExpanded && <FormAddInimigo />}
            <button className='botao-add-inimigo' type="submit" onClick={adicionarAoGrupo}>Adicionar outro ao grupo</button>
            <button className='botao-add-inimigo' type="submit">Enviar</button>
        </div>
    )

}