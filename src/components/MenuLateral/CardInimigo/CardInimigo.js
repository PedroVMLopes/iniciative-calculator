import React, { useState, useEffect } from "react";
import { FaPencilRuler, FaHeart } from "react-icons/fa";
import { GiCheckedShield } from "react-icons/gi";
import "./CardInimigo.css";

const FormCardInimigo = ({
  inimigoData,
  handleChange,
  toggleExpand,
  isExpanded,
}) => {
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

const CardInimigo = ({ inimigo }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [inimigoData, setInimigoData] = useState(null);

  // Carrega os dados do inimigo específico ao montar o componente ou quando o ID muda
  useEffect(() => {
    const inimigos = JSON.parse(localStorage.getItem("cardsInimigos")) || [];
    const inimigoObject = inimigos.find((p) => p.id === inimigo.id);

    if (inimigoObject?.dados) {
      setInimigoData({
        ...inimigoObject.dados,
        numDeInimigos: inimigoObject.numDeInimigos || 1,
      });
    } else {
      console.warn(
        `Inimigo com ID ${inimigo.id} não encontrado no localStorage.`
      );
    }
  }, [inimigo.id]);

  // Atualiza o inimigo no localStorage
  const updateInimigoList = (updatedData) => {
    const inimigos = JSON.parse(localStorage.getItem("cardsInimigos")) || [];
    const updatedInimigos = inimigos.map((p) =>
      p.id === inimigo.id ? { ...p, dados: updatedData } : p
    );

    localStorage.setItem("cardsInimigos", JSON.stringify(updatedInimigos));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInimigoData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      updateInimigoList(updatedData);
      return updatedData;
    });
  };

  const toggleExpand = () => setIsExpanded((prevState) => !prevState);

  return (
    <div>
      {Array.from({ length: inimigoData.numDeInimigos }).map((_, index) => (
        <FormCardInimigo
          key={index}
          inimigoData={inimigoData}
          handleChange={handleChange}
          toggleExpand={toggleExpand}
          isExpanded={isExpanded}
        />
      ))}
    </div>
  );
};

export default CardInimigo;
