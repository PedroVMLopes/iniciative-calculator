import React, { useState, useEffect } from "react";
import BotoesAdicionar from "../Main/BotoesAdicionar/BotoesAdicionar";
import CardPlayer from "./CardPlayer/CardPlayer";
import CardInimigo from "./CardInimigo/CardInimigo";
import styles from "./MenuLateral.css";
import NumeroIniciativa from "./NumeroIniciativa/NumeroIniciativa";

// Função para obter os dados armazenados no localStorage
const getLocalStorageData = (key) => {
  const savedData = localStorage.getItem(key);
  return savedData ? JSON.parse(savedData) : [];
};

const MenuLateral = () => {
  const [players, setPlayers] = useState([]);
  const [cardsInimigos, setCardsInimigos] = useState([]);

  // Carrega os dados ao montar o componente
  useEffect(() => {
    setPlayers(getLocalStorageData("players"));
    setCardsInimigos(getLocalStorageData("cardsInimigos"));
  }, []);

  // Escuta mudanças no localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setPlayers(getLocalStorageData("players"));
      setCardsInimigos(getLocalStorageData("cardsInimigos"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  /* Junta os jogadores e inimigos e marca os dois adequadamente */
  const listaTotal = [
    ...players.map((player) => ({ ...player, tipo: "player" })),
    ...cardsInimigos.map((inimigo) => ({ ...inimigo, tipo: "inimigo" })),
  ];

  /* Organiza a lista na ordem correta de iniciativa */
  const sortedList = [...listaTotal].sort(
    (a, b) => b.iniciativa - a.iniciativa
  );

  return (
    <div className="menu-lateral">
      <h1>CONTAGEM DE INICIATIVA</h1>
      <div className="CardsLinhaDeIniciativa">
        {/* Renderizar jogadores */}
        {sortedList.map((card, index) => (
          <div key={index} className="CardComIniciativa">
            {card.tipo === "player" && <CardPlayer player={card} />}
            {card.tipo === "inimigo" && <CardInimigo inimigo={card} />}
            <NumeroIniciativa
              iniciativa={card.iniciativa}
              className="numero-iniciativa"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuLateral;
