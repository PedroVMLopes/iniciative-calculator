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

  console.log("inimigos: ", cardsInimigos);
  console.log("Players: ", players);

  const listaTotal = [...players, ...cardsInimigos];
  listaTotal.sort((a, b) => b.iniciativa - a.iniciativa);
  console.log("Lista total: ", listaTotal);

  return (
    <div className="menu-lateral">
      <h1>CONTAGEM DE INICIATIVA</h1>
      <div className="CardsLinhaDeIniciativa">
        {/* Renderizar jogadores */}
        {players.map((player) => (
          <div className="CardComIniciativa" key={`player-${player.dados.id}`}>
            <CardPlayer player={player} />
            <NumeroIniciativa iniciativa={player.iniciativa} />
          </div>
        ))}

        {/* Renderizar inimigos */}
        {cardsInimigos.map((inimigo) => (
          <div
            className="CardComIniciativa"
            key={`inimigo-${inimigo.dados.map((d) => d.id)}`}
          >
            <CardInimigo inimigo={inimigo} />
            <NumeroIniciativa iniciativa={inimigo.iniciativa} />
          </div>
        ))}

        {listaTotal.map(
          (card) => (
            console.log("card: ", card),
            (
              <div
                className="CardComIniciativa"
                key={`card-${card.dados.map((d) => d.id)}`}
              ></div>
            )
          )
        )}
      </div>
    </div>
  );
};

export default MenuLateral;
