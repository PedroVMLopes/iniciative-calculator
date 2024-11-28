import React, { useState, useEffect } from 'react';
import BotoesAdicionar from '../Main/BotoesAdicionar/BotoesAdicionar';
import CardPlayer from './CardPlayer/CardPlayer';
import styles from './MenuLateral.css';

// Função para obter os dados armazenados no localStorage
const getPlayers = () => {
    const savedPlayers = localStorage.getItem('players');
    return savedPlayers ? JSON.parse(savedPlayers) : [];
};

const MenuLateral = () => {
    const [players, setPlayers] = useState([]);

    // Carrega os jogadores ao montar o componente
    useEffect(() => {
        setPlayers(getPlayers());
    }, []);

    // Monitorar atualizações no localStorage
    useEffect(() => {
        const handleStorageChange = () => {
            setPlayers(getPlayers());
        };

        // Escuta para mudanças no localStorage
        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);


    return (
        <div className="menu-lateral">
            <h1>CONTAGEM DE INICIATIVA</h1>
            <div className='CardsLinhaDeIniciativa'>
                {players.map((player) => (
                    <CardPlayer key={player.id} player={player} />
                ))}
            </div>
        </div>
    );
}

export default MenuLateral;