import "./MenuAddInimigo.css";
import FormAddInimigo from "./FormAddInimigo";
import React, { useState, createContext } from "react";

export const FormAddInimigoContext = createContext();

function MenuAddInimigo() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <FormAddInimigoContext.Provider value={{ isExpanded, setIsExpanded }}>
      <div className="menu-add-inimigo">
        <div className="menu-add-inimigo header">
          <h1>Adicionar Inimigo</h1>
        </div>
        <FormAddInimigo />
      </div>
    </FormAddInimigoContext.Provider>
  );
}

export default MenuAddInimigo;
