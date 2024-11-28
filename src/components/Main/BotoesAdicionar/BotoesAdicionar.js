import React, { useState } from "react";
import MenuAddPlayer from '../MenuAddPlayer/MenuAddPlayer';
import styles from './BotoesAdicionar.css';

export default function BotoesAdicionar() {
    const [isExpanded, setIsExpanded] = useState(true);
    const toggleExpandPlayer = () => {
        setIsExpanded((prevState) => !prevState);
    };
    
    return (
        <div className="botoes-adicionar">
            <button className="botao-adicionar botao-adicionar-player" onClick={toggleExpandPlayer}>Adicionar Player</button>
                {isExpanded && <MenuAddPlayer />}
            <button className="botao-adicionar botao-adicionar-inimigo" >Adicionar Inimigo</button>
        </div>
    );
}