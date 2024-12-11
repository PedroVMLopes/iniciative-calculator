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
    Array.isArray(inimigoObject.dados)
      ? inimigoObject.dados
      : [inimigoObject.dados] || []
  );

  // Carrega os dados do inimigo específico ao montar o componente ou quando o ID muda
  useEffect(() => {
    if (inimigoObject?.dados) {
      setInimigoData(
        Array.isArray(inimigoObject.dados)
          ? inimigoObject.dados
          : [inimigoObject.dados]
      );
    } else {
      console.warn(
        `Inimigo com ID ${inimigo.id} não encontrado no localStorage.`
      );
    }
  }, [inimigo.id]);

  // Recebe as informações alteradas e envia para a função de atualização
  const handleChange = (e, index) => {
    const { name, value } = e.target;

    setInimigoData((prevData) => {
      const newData = [...prevData];
      newData[index] = { ...newData[index], [name]: value };

      // Atualiza os dados corretamente no localStorage
      updateInimigoList(newData);

      return newData;
    });
  };

  // Atualiza o inimigo no localStorage
  const updateInimigoList = (updatedData) => {
    const inimigos = JSON.parse(localStorage.getItem("cardsInimigos")) || [];

    // Atualiza o inimigo correto dentro do array no localStorage
    const updatedInimigos = inimigos.map((item) => {
      if (item.dados.id === updatedData[0].id) {
        // Substitui os dados antigos pelos novos sem duplicar
        return { ...item, dados: updatedData };
      }
      return item;
    });

    // Salva novamente no localStorage
    localStorage.setItem("cardsInimigos", JSON.stringify(updatedInimigos));
  };

  useEffect(() => {
    if (inimigoData && Array.isArray(inimigoData)) {
      inimigoData.forEach((data, index) => {
        localStorage.setItem(`${storageKey}-${index}`, JSON.stringify(data));
      });
    }
  }, [inimigoData, storageKey]);

  const toggleExpand = () => setIsExpanded((prevState) => !prevState);

  return (
    <div>
      {inimigoData.map((data, index) => (
        <FormCardInimigo
          key={index}
          inimigoData={data}
          handleChange={(e) => handleChange(e, index)}
          toggleExpand={toggleExpand}
          isExpanded={isExpanded}
        />
      ))}
    </div>
  );
};

export default CardInimigo;
