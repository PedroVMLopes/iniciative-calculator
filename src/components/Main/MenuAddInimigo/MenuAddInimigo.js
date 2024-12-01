import './MenuAddInimigo.css';
import FormAddInimigo from './FormAddInimigo';
import React, { useState, useEffect, createContext } from 'react';

export const FormAddInimigoContext = createContext();

function MenuAddInimigo() {

    const [isExpanded, setIsExpanded] = useState(true);
    
    const adicionarAoGrupo = (event) => {
        event.preventDefault();
        setIsExpanded( prevState => !prevState);
    }

    return (
        <FormAddInimigoContext.Provider value={{ isExpanded, setIsExpanded }}>
            <div className="menu-add-inimigo">
                <div className="menu-add-inimigo header">
                    <h1>Adicionar Inimigo</h1>
                </div>
                <FormAddInimigo />
                <button className='botao-add-inimigo' type="submit" onClick={adicionarAoGrupo}>Adicionar outro ao grupo</button>
                <button className='botao-add-inimigo' type="submit">Enviar</button>
            </div>
        </FormAddInimigoContext.Provider>
        
    )

}

export default MenuAddInimigo;