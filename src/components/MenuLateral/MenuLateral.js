import React, { useState, useEffect } from "react";
import BotaoAdicionarJogador from "./BotoesAdicionar/BotaoAdicionarJogador";
import BotaoAdicionarInimigo from "./BotoesAdicionar/BotaoAdicionarInimigo";
import CardPlayer from "./CardPlayer/CardPlayer";
import CardInimigo from "./CardInimigo/CardInimigo";
import styles from "./MenuLateral.css";
import NumeroIniciativa from "./NumeroIniciativa/NumeroIniciativa";
import MenuAddInimigo from "./MenuAddInimigo/MenuAddInimigo";
import MenuAddPlayer from "./MenuAddPlayer/MenuAddPlayer";

import { GiOrcHead } from "react-icons/gi";
import { GiBattleGear } from "react-icons/gi";

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

  const [isInimigoExpanded, setIsInimigoExpanded] = useState(false);
  const [isPlayerExpanded, setIsPlayerExpanded] = useState(false);

  const toggleExpandInimigo = () => {
    setIsInimigoExpanded((prevState) => !prevState);
  };
  const toggleExpandPlayer = () => {
    setIsPlayerExpanded((prevState) => !prevState);
  };

  return (
    <div className="menu-lateral">
      <div className="flex items-center justify-evenly mt-5 mb-2">
        <button
          onClick={toggleExpandPlayer}
          className="w-14 h-10 p-0 bg-[var(--azul-escuro)] flex items-center justify-evenly rounded-lg text-white hover:bg-[var(--azul-claro)] text-2xl font-extrabold"
        >
          +<GiBattleGear />
        </button>
        <h1 className="flex items-center p-0">CONTAGEM DE INICIATIVA</h1>
        <button
          onClick={toggleExpandInimigo}
          className="w-14 h-10 p-0 bg-[var(--vermelho-claro)] flex items-center justify-evenly rounded-lg text-white hover:bg-[var(--vermelho-escuro)] text-2xl font-extrabold"
        >
          +<GiOrcHead />
        </button>
      </div>

      <div className="CardsLinhaDeIniciativa">
        {isInimigoExpanded && <MenuAddInimigo />}
        {isPlayerExpanded && <MenuAddPlayer />}
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
