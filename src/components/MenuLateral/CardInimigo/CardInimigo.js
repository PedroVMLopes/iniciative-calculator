import React, { useState, useEffect } from "react";
import { FaPencilRuler, FaHeart } from "react-icons/fa";
import { GiCheckedShield } from "react-icons/gi";
import { RiDeleteBin7Fill } from "react-icons/ri";
import "./CardInimigo.css";

const FormCardInimigo = ({
  inimigoData,
  handleChange,
  toggleExpand,
  handleDelete,
  isExpanded,
  index,
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
            <button type="button" onClick={(e) => handleDelete(e, index)}>
              <RiDeleteBin7Fill /> Remover
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

  const inimigoObject = inimigos.find((p) =>
    p.dados.some((d) =>
      inimigo.dados.some((inimigoDado) => d.id === inimigoDado.id)
    )
  );

  const inimigoId = inimigoObject ? inimigoObject.dados.map((d) => d.id) : [];
  const storageKey = `inimigoData-${inimigoId}`;

  const [inimigoData, setInimigoData] = useState(
    inimigoObject
      ? Array.isArray(inimigoObject.dados)
        ? inimigoObject.dados
        : [inimigoObject.dados]
      : []
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
      console.log("PrevData INIMIGO:", prevData);
      const newData = [...prevData];
      newData[index] = { ...newData[index], [name]: value };
      console.log("NewData INIMIGO:", newData);

      // Atualiza os dados corretamente no localStorage
      updateInimigoList(newData);

      return newData;
    });
  };

  // Atualiza o inimigo no localStorage
  const updateInimigoList = (updatedData) => {
    const inimigos = JSON.parse(localStorage.getItem("cardsInimigos")) || [];

    // Atualiza os inimigos no localStorage
    const updatedInimigos = inimigos.map((item) => {
      const isMatchingInimigo = item.dados.some((d) =>
        updatedData.some((newData) => newData.id === d.id)
      );

      if (isMatchingInimigo) {
        return { ...item, dados: updatedData };
      }

      return item;
    });

    // Filtra grupos vazios e atualiza o localStorage
    const filteredInimigos = updatedInimigos.filter(
      (item) => item.dados && item.dados.length > 0
    );

    localStorage.setItem("cardsInimigos", JSON.stringify(filteredInimigos));
  };

  useEffect(() => {
    if (inimigoData && Array.isArray(inimigoData)) {
      inimigoData.forEach((data, index) => {
        localStorage.setItem(`${storageKey}-${index}`, JSON.stringify(data));
      });
    }
  }, [inimigoData, storageKey]);

  const toggleExpand = () => setIsExpanded((prevState) => !prevState);

  const handleDelete = (e, index) => {
    setInimigoData((prevData) => {
      const deletedId = prevData[index]?.id; // Armazena o ID do item a ser excluído
      const updatedData = prevData.filter((_, i) => i !== index); // Filtra o item a ser removido

      // Verifica se o grupo está vazio após a exclusão
      if (updatedData.length === 0) {
        // Se não houver mais inimigos no grupo, removemos o grupo do localStorage
        const inimigos =
          JSON.parse(localStorage.getItem("cardsInimigos")) || [];
        const updatedInimigos = inimigos.filter(
          (item) => !item.dados.some((d) => d.id === deletedId)
        );

        localStorage.setItem("cardsInimigos", JSON.stringify(updatedInimigos));
      } else {
        // Caso contrário, atualizamos o grupo com os dados restantes
        updateInimigoList(updatedData);
      }

      return updatedData;
    });
  };

  return (
    <div>
      {inimigoData.map((data, index) => (
        <FormCardInimigo
          key={data.id}
          index={index}
          inimigoData={data}
          handleChange={(e) => handleChange(e, index)}
          handleDelete={(e) => handleDelete(e, index)}
          toggleExpand={toggleExpand}
          isExpanded={isExpanded}
        />
      ))}
    </div>
  );
};

export default CardInimigo;
