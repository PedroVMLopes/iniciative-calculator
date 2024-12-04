import React, { useState, useEffect } from "react";
import { FaPencilRuler, FaHeart } from "react-icons/fa";
import { GiCheckedShield } from "react-icons/gi";
import "./CardInimigo.css";

const CardInimigo = ({ inimigo }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const [inimigoData, setInimigoData] = useState({
    ca: "",
    pv: "",
    mod: "",
    rolagem: "",
    condicao: "",
    nome: "",
  });

  // Carrega os dados iniciais do localStorage
  useEffect(() => {
    const inimigos = JSON.parse(localStorage.getItem("cardsInimigos")) || []; // Recupera a lista de inimigos
    const inimigoDetails = inimigos.find((p) => p.id === inimigo.id); // Procura o inimigo na lista

    // Atualiza os dados do inimigo com os resultados da busca
    if (inimigoDetails) {
      setInimigoData((prevData) => ({
        ...prevData,
        ...inimigoDetails,
      }));
    }
  }, [inimigo.id]);

  // Atualiza a lista de inimigos no localStorage
  const updateInimigoList = (updatedInimigo) => {
    const inimigos = JSON.parse(localStorage.getItem("cardsInimigos")) || [];
    const updatedInimigos = inimigos.map((p) =>
      p.id === updatedInimigo.id ? { ...p, ...updatedInimigo } : p
    );

    localStorage.setItem("cardsInimigos", JSON.stringify(updatedInimigos));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInimigoData((prevData) => {
      const newData = { ...prevData, [name]: value };
      updateInimigoList({ id: inimigo.id, ...newData }); // Atualiza a lista geral
      return newData;
    });
  };

  const toggleExpand = () => {
    setIsExpanded((prevState) => !prevState);
  };

  return (
    <div className="card-inimigo">
      <h1>{inimigoData.nome}</h1>
      <form className="card-inimigo-info">
        {isExpanded && (
          <div>
            <label>
              <p>
                <GiCheckedShield />
              </p>
              <input
                type="text"
                name="ca"
                value={inimigoData.ca}
                onChange={handleChange}
              />
            </label>
            <label>
              <p>
                <FaHeart />
              </p>
              <input
                type="text"
                name="pv"
                value={inimigoData.pv}
                onChange={handleChange}
              />
            </label>
            <label>
              <p>MOD: </p>
              <input
                type="text"
                name="mod"
                value={inimigoData.mod}
                onChange={handleChange}
              />
            </label>
            <label>
              <p>ROLAGEM: </p>
              <input
                type="text"
                name="rolagem"
                value={inimigoData.rolagem}
                onChange={handleChange}
              />
            </label>
            <label>
              <p>CONDICAO: </p>
              <input
                type="text"
                name="condicao"
                value={inimigoData.condicao}
                onChange={handleChange}
              />
            </label>
            <button type="button" onClick={toggleExpand}>
              <FaPencilRuler /> Concluir
            </button>
          </div>
        )}
      </form>

      {!isExpanded && (
        <div className="card-inimigo-info-retraido">
          <label>
            <GiCheckedShield />
            <input
              type="text"
              name="ca"
              value={inimigoData.ca}
              onChange={handleChange}
            />
          </label>
          <label>
            <FaHeart />
            <input
              type="text"
              name="pv"
              value={inimigoData.pv}
              onChange={handleChange}
            />
          </label>
          <button type="button" onClick={toggleExpand}>
            <FaPencilRuler />
          </button>
        </div>
      )}
    </div>
  );
};

export default CardInimigo;
