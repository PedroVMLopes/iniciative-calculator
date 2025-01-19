import React, { useState, useEffect } from "react";
import { FaPencilRuler, FaHeart } from "react-icons/fa";
import { FaShieldAlt } from "react-icons/fa";
import { RiDeleteBin7Fill } from "react-icons/ri";
import "./CardInimigo.css";

const FormCardInimigo = ({
  inimigoData,
  handleChange,
  toggleExpand,
  handleDelete,
  isExpanded,
  index,
  getDuracaoDaCondicao,
  setSetDuracaoDaCondicao,
}) => {
  return (
    <div
      className={`card-inimigo shadow-xl w-full rounded-l-md ${
        inimigoData.condicao ? "cardComCondicao" : ""
      }
      ${inimigoData.pv === "0" ? "morto" : ""}
      `}
    >
      <div className="flex relative flex-col w-[100%] justify-between font-bold text-lg text-[var(--bege)] ">
        <img
          src="../Decoracao_canto1.png"
          className="absolute -z-9 w-[20%] top-0 left-0 opacity-30"
        />
        <h1>{inimigoData.nome}</h1>
      </div>

      {/* Campos do card expandido */}
      <form className="flex flex-col justify-between font-bold text-lg text-[var(--bege)] mt-4 ">
        {isExpanded && (
          <div>
            <div className="flex flex-row w-full justify-evenly">
              <label className="flex z-10 flex-row">
                <p>
                  <FaShieldAlt />
                </p>
                <input
                  className="w-20 ml-2 mb-2 rounded-lg shadow-xl text-black pl-2"
                  type="text"
                  name="ca"
                  value={inimigoData.ca}
                  onChange={handleChange}
                />
              </label>
              <label className="flex z-10 flex-row">
                <p>
                  <FaHeart />
                </p>
                <input
                  className="w-20 ml-2 mb-2 rounded-lg shadow-xl text-black pl-2"
                  type="text"
                  name="pv"
                  value={inimigoData.pv}
                  onChange={handleChange}
                />
              </label>
            </div>

            <label className="flex flex-col mx-7">
              <p>Modificadores: </p>
              <input
                className="flex flex-col w-full rounded-lg shadow-xl text-black pl-2"
                type="text"
                name="mod"
                value={inimigoData.mod}
                onChange={handleChange}
              />
            </label>
            <label className="flex flex-col mx-7 mb-2">
              <p>Condição: </p>
              <input
                className="flex flex-col w-full rounded-lg shadow-xl text-black pl-2"
                type="text"
                name="condicao"
                value={inimigoData.condicao}
                onChange={handleChange}
              />
            </label>
            {inimigoData.condicao && (
              <label className="flex flex-col mx-7 mb-2">
                <p>Duração: </p>
                <input
                  className="flex flex-col w-full rounded-lg shadow-xl text-black pl-2"
                  type="text"
                  name="duracao"
                  value={getDuracaoDaCondicao}
                  onChange={(e) => setSetDuracaoDaCondicao(e.target.value)}
                />
              </label>
            )}
            <div className="flex row">
              <button
                className="rounded-full px-3 py-1"
                type="submit"
                onClick={(e) => handleDelete(e, index)}
              >
                <RiDeleteBin7Fill />
              </button>
              <button
                className="rounded-full px-3 py-1"
                type="button"
                onClick={toggleExpand}
              >
                Concluir
              </button>
            </div>
          </div>
        )}
      </form>
      {/* Campos do card retraído */}
      {!isExpanded && (
        <div className="flex flex-col w-full">
          <div className="flex z-10 flex-row items-center justify-evenly">
            <label className="flex row">
              <FaShieldAlt />
              <input
                className="flex flex-col w-12 rounded-md shadow-xl text-black font-bold ml-2 pl-2"
                type="text"
                name="ca"
                value={inimigoData.ca}
                onChange={handleChange}
              />
            </label>
            <label className="flex row">
              <FaHeart />
              <input
                className="flex flex-col w-12 rounded-md shadow-xl text-black font-bold ml-2 pl-2"
                type="text"
                name="pv"
                value={inimigoData.pv}
                onChange={handleChange}
              />
            </label>
            <button
              className="rounded-full px-3 py-2"
              type="button"
              onClick={toggleExpand}
            >
              <FaPencilRuler />
            </button>
          </div>
          {/* Campos do card retraído com condicao */}
          {inimigoData.condicao && (
            <div className="flex flex-row justify-evenly mx-7 mb-2">
              <div className="info">
                <h2>Condição: </h2>
                <label>
                  <input
                    className="flex flex-col w-[70%] rounded-lg shadow-xl text-black font-bold pl-2 mt-1"
                    type="text"
                    name="condicao"
                    value={inimigoData.condicao}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="info">
                <h2>Duração: </h2>
                <label>
                  <input
                    className="flex flex-col w-[70%] rounded-lg shadow-xl text-black font-bold pl-2 mt-1"
                    type="text"
                    name="duracao"
                    value={getDuracaoDaCondicao}
                    onChange={(e) => setSetDuracaoDaCondicao(e.target.value)}
                  />
                </label>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const CardInimigo = ({ inimigo }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [getDuracaoDaCondicao, setSetDuracaoDaCondicao] = useState("");
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

  /* Salva os dados na localStorage quando o inimigoData mudar */
  useEffect(() => {
    if (inimigoData && Array.isArray(inimigoData)) {
      inimigoData.forEach((data, index) => {
        localStorage.setItem(`${storageKey}-${index}`, JSON.stringify(data));
      });
    }
  }, [inimigoData, storageKey]);

  /* Deleta a duração da condição caso a condição seja removida */
  useEffect(() => {
    if (!inimigoData[0].condicao) {
      setSetDuracaoDaCondicao("");
    }
  }, [inimigoData[0].condicao]);

  const toggleExpand = () => setIsExpanded((prevState) => !prevState);

  const handleDelete = (e, index) => {
    e.preventDefault();
    setInimigoData((prevData) => {
      const deletedId = prevData[index]?.id; // Armazena o ID do item a ser excluído
      const updatedData = prevData.filter((_, i) => i !== index); // Filtra o item a ser removido

      // Verifica se o grupo está vazio após a exclusão
      if (updatedData.length === 0) {
        // Se não houver mais inimigos no grupo, remove o grupo do localStorage
        const inimigos =
          JSON.parse(localStorage.getItem("cardsInimigos")) || [];
        const updatedInimigos = inimigos.filter(
          (item) => !item.dados.some((d) => d.id === deletedId)
        );

        localStorage.setItem("cardsInimigos", JSON.stringify(updatedInimigos));
      } else {
        // Caso contrário, atualiza o grupo com os dados restantes
        updateInimigoList(updatedData);
      }
      window.location.reload(); // Não é ideal recarregar a página, mas por enquanto funciona
      return updatedData;
    });
  };

  return (
    <div className="w-[100%]" key={storageKey}>
      {inimigoData.map((data, index) => (
        <FormCardInimigo
          key={data.id}
          index={index}
          inimigoData={data}
          handleChange={(e) => handleChange(e, index)}
          handleDelete={(e) => handleDelete(e, index)}
          toggleExpand={toggleExpand}
          isExpanded={isExpanded}
          getDuracaoDaCondicao={getDuracaoDaCondicao}
          setSetDuracaoDaCondicao={setSetDuracaoDaCondicao}
        />
      ))}
    </div>
  );
};

export default CardInimigo;
