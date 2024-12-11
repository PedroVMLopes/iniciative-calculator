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
  const inimigos = JSON.parse(localStorage.getItem("cardsInimigos")) || [];

  const inimigoObject = inimigos.find((p) => p.dados.id === inimigo.dados.id);

  const storageKey = `inimigoData-${inimigoObject.dados.id}`;

  const [inimigoData, setInimigoData] = useState(
    inimigo.dados || {
      ca: "",
      pv: "",
      mod: "",
      rolagem: "",
      condicao: "",
    }
  );

  // Carrega os dados do inimigo específico ao montar o componente ou quando o ID muda
  useEffect(() => {
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

  // Recebe as informações alteradas e envia para a função de atualização
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("valor", value);
    console.log("e.target", e.target);

    setInimigoData((prevData) => {
      const newData = { ...prevData, [name]: value };

      // Atualiza apenas os dados relevantes no localStorage
      updateInimigoList({ id: inimigo.dados.id, dados: newData });

      return newData;
    });
  };

  // Atualiza o inimigo no localStorage
  const updateInimigoList = (updatedData) => {
    const inimigos = JSON.parse(localStorage.getItem("cardsInimigos")) || [];

    const updatedInimigos = inimigos.map((p) => {
      if (Array.isArray(p.dados)) {
        // Caso p.dados seja um array
        const updatedDadosArray = p.dados.map((item) =>
          item.id === updatedData.id ? { ...item, ...updatedData.dados } : item
        );
        return { ...p, dados: updatedDadosArray };
      } else if (p.dados.id === updatedData.id) {
        // Caso p.dados seja um objeto único
        return { ...p, dados: { ...p.dados, ...updatedData.dados } };
      }
      return p; // Retorna o inimigo original caso o ID não corresponda
    });

    localStorage.setItem("cardsInimigos", JSON.stringify(updatedInimigos));
  };

  useEffect(() => {
    if (inimigoData && Object.keys(inimigoData).length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(inimigoData));
    }
  }, [inimigoData, storageKey]);

  const toggleExpand = () => setIsExpanded((prevState) => !prevState);

  return (
    <div>
      {Array.from({ length: inimigoData.numDeInimigos }).map((_, index) => (
        <FormCardInimigo
          key={index}
          inimigoData={inimigoData[index] || inimigoData}
          handleChange={handleChange}
          toggleExpand={toggleExpand}
          isExpanded={isExpanded}
        />
      ))}
    </div>
  );
};

export default CardInimigo;
