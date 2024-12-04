import React, { useState, useEffect } from "react";
import { FaPencilRuler, FaHeart } from "react-icons/fa";
import { GiCheckedShield } from "react-icons/gi";
import "./CardInimigo.css";

const CardInimigo = ({ inimigo }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  // Chave única para o localStorage
  const storageKey = `inimigoData-${inimigo.id}`;

  // Estado para armazenar os dados do inimigo
  const [inimigoData, setInimigoData] = useState({
    ca: "",
    pv: "",
    mod: "",
    rolagem: "",
    condicao: "",
    nome: "",
  });

  // Verifica se 'inimigos' já foi salvo no localStorage
  useEffect(() => {
    const inimigos = JSON.parse(localStorage.getItem("inimigos")) || [];

    const inimigoDetails = inimigos.find((p) => p.id === inimigo.id);

    if (inimigoDetails) {
      const storedData = localStorage.getItem(storageKey);

      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setInimigoData((prevData) => ({
          ...prevData,
          ...parsedData,
          nome: inimigoDetails.nome || "",
          ca: inimigoDetails.ca || "",
          pv: inimigoDetails.pv || "",
          mod: inimigoDetails.mod || "",
          rolagem: inimigoDetails.rolagem || "",
        }));
      }
    }
  }, [inimigo.id]);

  // Atualiza os dados do inimigo no localStorage
  const updateInimigoList = (updatedInimigo) => {
    const inimigos = JSON.parse(localStorage.getItem("inimigos")) || [];
    const updatedInimigos = inimigos.map((p) =>
      p.id === inimigo.id ? updatedInimigo : p
    );

    localStorage.setItem("inimigos", JSON.stringify(updatedInimigos));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInimigoData((prevData) => {
      const newData = { ...prevData, [name]: value };
      updateInimigoList({ id: inimigo.id, ...newData }); // Atualiza lista geral
      return newData;
    });
  };

  useEffect(() => {
    if (inimigoData && Object.keys(inimigoData).length > 0) {
      console.log("Salvando dados no localStorage:", inimigoData); // Depuração
      localStorage.setItem(storageKey, JSON.stringify(inimigoData));
    }
  }, [inimigoData, storageKey]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const toggleExpand = () => {
    setIsExpanded((prevState) => !prevState);
  };

  return (
    <div className="card-inimigo">
      <h1>{inimigoData.nome}</h1>
      <form onSubmit={handleSubmit} className="card-inimigo-info">
        {/* Campos do card - expandido */}
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

      {/* Campos do card - retraído */}
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
            <FaPencilRuler /> Editar
          </button>
        </div>
      )}
    </div>
  );
};

export default CardInimigo;
