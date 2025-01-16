import React, { useState, useEffect } from "react";
import { PreloadedPartyData } from "./PartyData";

/* Esse componente manipula os dados salvos previamente na PartyData */

const Party = () => {
  const players = PreloadedPartyData || [];

  const savePlayer = (players) => {
    localStorage.setItem("players", JSON.stringify(players));
    window.dispatchEvent(new CustomEvent("cardsAtualizados"));
  };

  const CardPlayer = (player) => {
    const nome = player.dados[0].nome;
    const ca = player.dados[0].ca;
    const pv = player.dados[0].pv;
    const mod = player.dados[0].mod;
    const roll = player.dados[0].rolagem;
    const id = player.dados[0].id;
    const iniciativa = Number(roll) + Number(mod);

    useEffect(() => {
      player.iniciativa = Math.floor(Math.random() * 20) + 1 + Number(mod);
    }, [player.dados[0].rolagem]);

    console.log(player);

    /* Esse componente já está funcionando */
    /* Ao clicar no botão novamente ele gera novas iniciativas mantendo as informações dos jogadores */

    return (
      <div className="mx-3 px-2 max-w-80" key={id}>
        <div className="flex flex-row items-center justify-center bg-[var(--azul-claro)] rounded-sm p-3 font-bold text-[var(--bege)]">
          <h2 className="font-bold font-cormorant text-lg">{nome}</h2>
          <p className="ml-2 font-thin">{iniciativa}</p>
        </div>
        <div className="grid grid-cols-2 gap-1 bg-[var(--cinza-claro)] rounded-sm p-3">
          <div className="flex flex-row justify-around p-2">
            <label className="w-24 font-bold">CA:</label>
            <input
              type="text"
              name="playerCa"
              className="w-full ml-2 pl-3 rounded-md font-bold"
              value={ca}
            />
          </div>
          <div className="flex flex-row justify-around p-2">
            <label className="w-24 font-bold">PV:</label>
            <input
              type="text"
              name="playerPv"
              className="w-full ml-2 pl-3 rounded-md font-bold"
              value={pv}
            />
          </div>
          <div className="flex flex-row justify-around p-2">
            <label className="w-24 font-bold">Mod:</label>
            <input
              type="text"
              name="playerMod"
              className="w-full ml-2 pl-3 rounded-md font-bold"
              value={mod}
            />
          </div>
          <div className="flex flex-row justify-around p-2">
            <label className="w-24 font-bold">Roll:</label>
            <input
              type="text"
              name="playerRoll"
              className="w-full ml-2 pl-3 rounded-md font-bold"
              onChange={(e) => (player.dados[0].rolagem = e.target.value)}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="font-bold font-unifraktur text-3xl pt-4 text-white">
        Grupo De Jogadores
      </h1>
      <div className="flex flex-col items-center">
        <button
          className="peer mt-6 bg-[var(--azul-claro)] hover:bg-[var(--azul-escuro)] rounded-sm p-3  font-bold text-[var(--bege)] "
          id="rollInitiative"
          onClick={() => savePlayer(players)}
        >
          Rolar Iniciativa Do Grupo
        </button>
        <p className="hidden peer-hover:opacity-100 peer-hover:block transition-all duration-300 ease-in-out text-sm text-white rounded-sm p-3">
          Esse botão utiliza os dados mostrados abaixo (salvos previamente) para
          rolar as iniciativas dos jogadores.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  gap-4 pt-12">
        {players.map((player) => CardPlayer(player))}
      </div>
    </div>
  );
};

export default Party;
