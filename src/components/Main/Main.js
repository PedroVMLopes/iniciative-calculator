import React from "react";
import Tests from "./Tests/Tests";

export default function Main() {
  return (
    <div className="Main flex flex-col items-center w-[calc(100%-520px)] ml-[520px]  p-3">
      <div className="NavBar flex bg-[var(--cinza-medio)] rounded-2xl p-1 justify-evenly max-w-3xl text-[var(--bege)] font-bold shadow-xl">
        <button className="p-2 mx-2">Testes</button>
        <button className="p-2 mx-2">Jogadores</button>
        <button className="p-2 mx-2">Criador de NPC</button>
      </div>
      <div className="Content flex justify-center mt-3 w-[98%]">
        <Tests />
      </div>
    </div>
  );
}
