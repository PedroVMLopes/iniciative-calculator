import React, { useState, useEffect } from "react";
import BotoesAdicionar from "../Main/BotoesAdicionar/BotoesAdicionar";
import CardPlayer from "./CardPlayer/CardPlayer";
import CardInimigo from "./CardInimigo/CardInimigo";
import styles from "./MenuLateral.css";

// Função para obter os dados dos jogadores armazenados no localStorage
const getPlayers = () => {
  const savedPlayers = localStorage.getItem("players");
  return savedPlayers ? JSON.parse(savedPlayers) : [];
};

// Função para obter os cards de inimigos armazenados no localStorage
const getCardsInimigos = () => {
  const savedCards = localStorage.getItem("cardsInimigos");
  return savedCards ? JSON.parse(savedCards) : [];
};

const MenuLateral = () => {
  const [players, setPlayers] = useState([]);
  const [cardsInimigos, setCardsInimigos] = useState([]);

  const listaIniciativa = [...players, ...cardsInimigos];

  // Carrega os jogadores ao montar o componente
  useEffect(() => {
    setPlayers(getPlayers());
    setCardsInimigos(getCardsInimigos());
  }, []);

  // Monitorar atualizações no localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setPlayers(getPlayers());
      setCardsInimigos(getCardsInimigos());
    };

    // Escuta para mudanças no localStorage
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div className="menu-lateral">
      <h1>CONTAGEM DE INICIATIVA</h1>
      <div className="CardsLinhaDeIniciativa">
        {players.map((player) => (
          <CardPlayer key={player.id} player={player} />
        ))}

        {listaIniciativa.map((inimigo) => (
          <CardInimigo key={inimigo.id} inimigo={inimigo} />
        ))}
      </div>
    </div>
  );
};

export default MenuLateral;
