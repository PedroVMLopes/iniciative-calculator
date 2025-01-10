import React, { useState, useEffect } from "react";
import BotaoAdicionarJogador from "./BotoesAdicionar/BotaoAdicionarJogador";
import BotaoAdicionarInimigo from "./BotoesAdicionar/BotaoAdicionarInimigo";
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
    <div className="menu-lateral w-lg">
      <img
        src="../Decoracao__topo.png"
        className="fixed max-w-[500px] -top-4 -z-5"
      ></img>
      <div className="flex items-center justify-evenly mt-4 mb-2 pt-10 z-10">
        <button
          onClick={toggleExpandPlayer}
          className="w-14 h-10 p-1 bg-[var(--azul-escuro)] flex items-center justify-evenly rounded-lg text-white hover:bg-[var(--azul-claro)] text-2xl font-extrabold"
        >
          <IoIosAdd /> <GiBattleGear />
        </button>
        <h1 className="font-unifraktur">Contagem De Iniciativa</h1>
        <button
          onClick={toggleExpandInimigo}
          className="w-14 h-10 p-1 bg-[var(--vermelho-escuro)] flex items-center justify-evenly rounded-lg text-white hover:bg-[var(--vermelho-claro)] text-2xl font-extrabold"
        >
          <IoIosAdd /> <GiOrcHead />
        </button>
      </div>
      <br />

      <div className="CardsLinhaDeIniciativa z-10">
        {isInimigoExpanded && <MenuAddInimigo />}
        {isPlayerExpanded && <MenuAddPlayer />}
        {/* Renderizar jogadores */}
        {sortedList.map((card, index) => (
          <div key={index} className="CardComIniciativa">
            {card.tipo === "player" && <CardPlayer player={card} />}
            {card.tipo === "inimigo" && <CardInimigo inimigo={card} />}
            <NumeroIniciativa iniciativa={card.iniciativa} />
          </div>
        ))}
      </div>
      <br />
      <img
        src="../plants.png"
        className="fixed -bottom-0 -left-4 max-w-lg -z-5 opacity-5"
      ></img>
    </div>
  );
};

export default MenuLateral;
