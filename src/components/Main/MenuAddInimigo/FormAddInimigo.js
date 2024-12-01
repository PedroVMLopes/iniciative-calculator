import './MenuAddInimigo.css';
import React, { useState, useEffect, createContext } from 'react';
import { FormAddInimigoContext } from './MenuAddInimigo';

function FormAddInimigo() {

    const { isExpanded, setIsExpanded } = React.useContext(FormAddInimigoContext);

    return (
        
            <div className="menu-add-inimigo menu-add-inimigo-corpo">

                {!isExpanded && (
                    <div className="menu-add-inimigo inimigo-adicionado">
                        <h1>Inimigo Criado</h1>
                    </div>
                )}

                {isExpanded && (
                    <form id='add-inimigo'>
                    <label htmlFor="nome">Nome:</label>
                    <input 
                        type="text" 
                        id="nome" 
                        name="nome" 
                    />
                    <br />
                    <label htmlFor="ca">CA:</label>
                    <input 
                        type="number"
                        id="ca" 
                        name="ca" 
                    />
                    <br />
                    <label htmlFor="pv">PV:</label>
                    <input 
                        type="number" 
                        id="pv" 
                        name="pv" 
                    />
                    <br />
                    <label htmlFor="mod">Mod:</label>
                    <input 
                        type="number" 
                        id="mod" 
                        name="mod" 
                    />
                    <br />
                    <label htmlFor="rolagem">Rolagem:</label>
                    <input 
                        type="text" 
                        id="rolagem" 
                        name="rolagem" 
                    />
                    <br />
                    <label htmlFor="condicao">Condição:</label>
                    <input 
                        type="text" 
                        id="condicao" 
                        name="condicao" 
                    />
                    <br />
                    </form>
                )}
                
            </div>
    );
    
}

export default FormAddInimigo;