import React, { useState, useEffect } from "react";
import { PreloadedPartyData } from "./PartyData";

/* Esse componente manipula os dados salvos previamente na PartyData */

const Party = () => {
  const players = PreloadedPartyData || [];

  const savePlayer = (players) => {
    localStorage.setItem("players", JSON.stringify(players));
  };

  const cardPlayer = (player) => {
    const iniciativa = player.iniciativa;
    const nome = player.dados[0].nome;
    const ca = player.dados[0].ca;
    const pv = player.dados[0].pv;
    const mod = player.dados[0].mod;
    const roll = player.dados[0].rolagem;
    const id = player.dados[0].id;
    return (
      <div className="mx-3 px-2 max-w-80" key={id}>
        <div className="flex flex-row items-center justify-center bg-[var(--azul-claro)] rounded-sm p-3 font-bold text-[var(--bege)]">
          <h2 className="font-bold font-cormorant text-lg">{nome}</h2>
          <h3 className="font-greatVibes text-lg pl-3">{iniciativa}</h3>
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
              value={roll}
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
      <button
        className="mt-6 bg-[var(--azul-claro)] hover:bg-[var(--azul-escuro)] rounded-sm p-3  font-bold text-[var(--bege)] "
        id="rollInitiative"
        onClick={() => savePlayer(players)}
      >
        Rolar Iniciativa Do Grupo
      </button>
      <div className="grid grid-cols-3 gap-4 pt-12">
        {players.map((player) => cardPlayer(player))}
      </div>
    </div>
  );
};

export default Party;
