import "./MenuAddPlayer.css";
import React, { useState, useEffect, useRef } from "react";

// Função para obter os dados armazenados no localStorage
const getPlayers = () => {
  const playersSalvos = localStorage.getItem("players");
  return playersSalvos ? JSON.parse(playersSalvos) : []; // Se não houver dados, retorna um array vazio
};

// Função para salvar os dados no localStorage
const savePlayer = (players) => {
  localStorage.setItem("players", JSON.stringify(players));
};

export default function MenuAddPlayer() {
  const [fieldNome, setFieldNome] = useState("");
  const [fieldCa, setFieldCa] = useState("");
  const [fieldPv, setFieldPv] = useState("");
  const [fieldMod, setFieldMod] = useState("");
  const [fieldRolagem, setFieldRolagem] = useState("");
  const [fieldCondicao, setFieldCondicao] = useState("");
  const [players, setPlayers] = useState(getPlayers()); // Carregar dados do localStorage ao inicializar

  /* Animação de renderizar o componente */
  const menuRef = useRef(null);

  useEffect(() => {
    if (menuRef.current) {
      menuRef.current.classList.add("animate-show");
    }
  }, []);

  useEffect(() => {
    savePlayer(players); // Sincroniza o estado com o localStorage sempre que players mudar
  }, [players]);

  const handleSubmit = (event) => {
    if (!fieldNome || !fieldCa || !fieldPv || !fieldMod) {
      alert("Preencha todos os campos");
      return;
    }

    const novoPlayer = [
      {
        id: Date.now(), // ID único baseado no timestamp
        nome: fieldNome,
        ca: fieldCa,
        pv: fieldPv,
        mod: fieldMod,
        rolagem: fieldRolagem,
      },
    ];

    let iniciativa = 0;
    /* Permite que o jogador realize a rolagem */
    if (fieldRolagem) {
      let modificador = fieldMod;
      iniciativa = Number(fieldRolagem) + Number(modificador);
    } else {
      let modificador = Number(fieldMod);
      iniciativa = Math.floor(Math.random() * 20) + 1 + modificador;
    }

    const playerComIniciativa = { dados: novoPlayer, iniciativa: iniciativa };
    const updatedPlayers = [...players, playerComIniciativa];

    setPlayers(updatedPlayers);

    setFieldNome("");
    setFieldCa("");
    setFieldPv("");
    setFieldMod("");
    setFieldRolagem("");

    window.dispatchEvent(new CustomEvent("cardsAtualizados"));
  };

  return (
    <div
      className={`menu-add-player mt-3 mb-8 z-10 shadow-xl opacity-0 transform origin-top scale-95 transition-all duration-300 ease-in-out`}
      ref={menuRef}
    >
      <div className="menu-add-player menu-add-player-header font-cormorant">
        <h1>Adicione os dados do jogador</h1>
      </div>
      <div className="menu-add-player menu-add-player-corpo p-4">
        <form>
          <label>Nome</label>
          <input
            type="text"
            name="playerName"
            value={fieldNome}
            onChange={(e) => setFieldNome(e.target.value)}
          />
          <br />
          <label>CA</label>
          <input
            type="text"
            name="playerCa"
            value={fieldCa}
            onChange={(e) => setFieldCa(e.target.value)}
          />
          <br />
          <label>PV</label>
          <input
            type="text"
            name="playerPv"
            value={fieldPv}
            onChange={(e) => setFieldPv(e.target.value)}
          />
          <br />
          <label>Modificadores</label>
          <input
            type="text"
            name="playerMod"
            value={fieldMod}
            onChange={(e) => setFieldMod(e.target.value)}
          />
          <br />
          <label>Rolagem</label>
          <input
            type="text"
            name="playerRolagem"
            value={fieldRolagem}
            onChange={(e) => setFieldRolagem(e.target.value)}
          />
          <br />
          <button
            type="submit"
            onClick={handleSubmit}
            className="hover:bg-[var(--azul-claro)]"
          >
            Adicionar Jogador
          </button>
        </form>
      </div>
    </div>
  );
}
