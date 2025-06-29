import React, { useState, useEffect } from "react";
import CardPlayer from "./CardPlayer/CardPlayer";
import CardInimigo from "./CardInimigo/CardInimigo";
import styles from "./MenuLateral.css";
import NumeroIniciativa from "./NumeroIniciativa/NumeroIniciativa";
import MenuAddInimigo from "./MenuAddInimigo/MenuAddInimigo";
import MenuAddPlayer from "./MenuAddPlayer/MenuAddPlayer";
/* Import dos icones */
import { GiOrcHead } from "react-icons/gi";
import { GiBattleGear } from "react-icons/gi";
import { IoIosAdd } from "react-icons/io";

// Função para obter os dados armazenados no localStorage
const getLocalStorageData = (key) => {
  const savedData = localStorage.getItem(key);
  return savedData ? JSON.parse(savedData) : [];
};

const MenuLateral = () => {
  const [players, setPlayers] = useState([]);
  const [cardsInimigos, setCardsInimigos] = useState([]);

  window.addEventListener("cardsAtualizados", () => {
    setCardsInimigos(getLocalStorageData("cardsInimigos"));
    setPlayers(getLocalStorageData("players"));
  });

  // Carrega os dados ao montar o componente
  useEffect(() => {
    setPlayers(getLocalStorageData("players"));
    setCardsInimigos(getLocalStorageData("cardsInimigos"));
  }, []);

  /* Junta os jogadores e inimigos e marca os dois adequadamente */
  const listaTotal = [
    ...players.map((player) => ({
      ...player,
      tipo: "player",
    })),
    ...cardsInimigos.map((inimigo) => ({
      ...inimigo,
      tipo: "inimigo",
    })),
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
    <div className="menu-lateral m-3 xl:w-[25%] lg:w-[35%] sm:w-[40%] rounded-md bg-white z-20">
      <div className="flex flex-col items-center justify-between mb-2 md:flex-row">
        <div className="flex">
          <button
            onClick={toggleExpandPlayer}
            className="relative w-12 h-10 p-1 pr-2 bg-[var(--azul-claro)] flex items-center justify-evenly rounded-md text-white hover:bg-sky-950 text-2xl font-extrabold shadow-xl "
          >
            <div className="absolute animate-pulse top-0 right-0">
              <IoIosAdd />
            </div>
            <GiBattleGear />
          </button>
        </div>
        <h1 className="font-unifraktur pl-2 pr-2">Contagem De Iniciativa</h1>
        <button
          onClick={toggleExpandInimigo}
          className="relative w-12 h-10 p-1 pr-2 bg-[var(--vermelho-claro)] flex items-center justify-evenly rounded-md text-white hover:bg-red-950 text-2xl font-extrabold shadow-xl "
        >
          <div className="absolute animate-pulse top-0 right-0">
            <IoIosAdd />
          </div>{" "}
          <GiOrcHead />
        </button>
      </div>

      <div className="CardsLinhaDeIniciativa z-10 overflow-y-auto">
        {isInimigoExpanded && <MenuAddInimigo />}
        {isPlayerExpanded && <MenuAddPlayer />}
        {/* Renderizar jogadores */}
        <br />
        {sortedList.map((card, index) => (
          <div
            key={index}
            className="flex flex-row py-2 justify-around z-10 pb-1 "
          >
            <div className="flex flex-row w-[80%] items-center shadow-md shadow-r-none rounded-md">
              {card.tipo === "player" && <CardPlayer player={card} />}
              {card.tipo === "inimigo" && <CardInimigo inimigo={card} />}
            </div>
            <div
              className={`flex relative flex-row w-[20%] items-center justify-center rounded-r-md shadow ${
                card.tipo === "player"
                  ? "bg-gradient-to-b from-[var(--azul-escuro)] to-[var(--azul-claro)]"
                  : "bg-gradient-to-b from-[var(--vermelho-escuro)] to-[var(--vermelho-claro)]"
              }`}
            >
              <NumeroIniciativa iniciativa={card.iniciativa} />
            </div>
          </div>
        ))}
      </div>
      <br />
    </div>
  );
};

export default MenuLateral;
