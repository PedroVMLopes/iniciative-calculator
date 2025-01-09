import React, { useState } from "react";
import MenuAddInimigo from "../MenuAddInimigo/MenuAddInimigo";

export default function BotaoAdicionarInimigo() {
  const [isInimigoExpanded, setIsInimigoExpanded] = useState(false);
  const toggleExpandInimigo = () => {
    setIsInimigoExpanded((prevState) => !prevState);
  };

  return (
    <div className="botoes-adicionar">
      <button
        className="botao-adicionar botao-adicionar-inimigo"
        onClick={toggleExpandInimigo}
      >
        Adicionar Inimigo
      </button>
    </div>
  );
}
