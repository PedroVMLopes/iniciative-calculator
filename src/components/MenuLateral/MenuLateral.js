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
import { FaHandPointLeft } from "react-icons/fa";
import { FaHandPointRight } from "react-icons/fa";

// Função para obter os dados armazenados no localStorage
const getLocalStorageData = (key) => {
  const savedData = localStorage.getItem(key);
  return savedData ? JSON.parse(savedData) : [];
};

const MenuLateral = () => {
  const [players, setPlayers] = useState([]);
  const [cardsInimigos, setCardsInimigos] = useState([]);

  window.addEventListener("cardsAtualizados", () => {
    console.log("Novo card adicionado");
    setCardsInimigos(getLocalStorageData("cardsInimigos"));
    setPlayers(getLocalStorageData("players"));
    console.log("players: ", players);
  });

  // Carrega os dados ao montar o componente
  useEffect(() => {
    setPlayers(getLocalStorageData("players"));
    setCardsInimigos(getLocalStorageData("cardsInimigos"));
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
    <div className="menu-lateral shadow-xl xl:w-[30%] lg:w-[35%] sm:w-[40%] rounded-md">
      <div className="sticky pb-2 top-0 z-20 bg-[var(--cinza-medio)] shadow-sm rounded-t-sm ">
        <img
          src="../Decoracao__topo.png"
          className="fixed left-0-top-3 -z-5 -top-[2%] xl:w-[30%] lg:w-[35%] sm:w-[40%] opacity-70"
        ></img>
        <div className="flex flex-col items-center justify-evenly mb-2 pt-[10%] px-3 z-10 md:flex-row">
          <div className="flex">
            <button
              onClick={toggleExpandPlayer}
              className="w-14 h-10 p-1 bg-[var(--azul-claro)] flex items-center justify-evenly rounded-l-md text-white hover:bg-sky-950  text-2xl font-extrabold shadow-xl "
            >
              <IoIosAdd /> <GiBattleGear />
            </button>
            <button
              onClick={toggleExpandInimigo}
              className="w-14 h-10 p-1 bg-[var(--vermelho-claro)] flex items-center justify-evenly rounded-r-md text-white hover:bg-red-950 text-2xl font-extrabold shadow-xl "
            >
              <IoIosAdd /> <GiOrcHead />
            </button>
          </div>
          <h1 className="font-unifraktur pl-2 pr-2">Contagem De Iniciativa</h1>
          <div className="flex">
            <button className="w-11 h-10 bg-[var(--cinza-claro)] border-2 border-[var(--cinza-medio)] border-r-0 flex items-center justify-evenly rounded-l-md text-black hover:bg-[var(--bege)] text-xl font-extrabold shadow-xl ">
              <FaHandPointLeft />
            </button>
            <button className="w-11 h-10 bg-[var(--cinza-claro)] border-2 border-[var(--cinza-medio)] border-l-0 flex items-center justify-evenly rounded-r-md text-black hover:bg-[var(--bege)] text-xl font-extrabold shadow-xl ">
              <FaHandPointRight />
            </button>
          </div>
        </div>
      </div>

      <div className="CardsLinhaDeIniciativa z-10 overflow-y-auto">
        {isInimigoExpanded && <MenuAddInimigo />}
        {isPlayerExpanded && <MenuAddPlayer />}
        {/* Renderizar jogadores */}
        <br />
        {sortedList.map((card, index) => (
          <div key={index} className="CardComIniciativa z-10 pb-1 ">
            {card.tipo === "player" && <CardPlayer player={card} />}
            {card.tipo === "inimigo" && <CardInimigo inimigo={card} />}
            <NumeroIniciativa iniciativa={card.iniciativa} />
          </div>
        ))}
        <div className=" flex justify-center align-bottom -left-4 h-[100%] sticky bottom-0 -z-5 opacity-5">
          <img src="../plants.png" className="h-[100%] bottom-0"></img>
        </div>
      </div>
      <br />
    </div>
  );
};

export default MenuLateral;
