import React, { useState } from "react";
import MenuAddPlayer from '../MenuAddPlayer/MenuAddPlayer';
import MenuAddInimigo from '../MenuAddInimigo/MenuAddInimigo';
import styles from './BotoesAdicionar.css';

export default function BotoesAdicionar() {
    const [isPlayerExpanded, setIsPlayerExpanded] = useState(false);
    const toggleExpandPlayer = () => {
        setIsPlayerExpanded((prevState) => !prevState);
    };

    const [isInimigoExpanded, setIsInimigoExpanded] = useState(false);
    const toggleExpandInimigo = () => {
        setIsInimigoExpanded((prevState) => !prevState);
    };
    
    return (
        <div className="botoes-adicionar">
            <button className="botao-adicionar botao-adicionar-player" onClick={toggleExpandPlayer}>Adicionar Player</button>
                {isPlayerExpanded && <MenuAddPlayer />}
            <button className="botao-adicionar botao-adicionar-inimigo" onClick={toggleExpandInimigo}>Adicionar Inimigo</button>
                {isInimigoExpanded && <MenuAddInimigo />}
        </div>
    );
}