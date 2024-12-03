import "./MenuAddInimigo.css";
import React, { useState, createContext, useEffect } from "react";

// Função que obtém os cards de inimigos armazenados no localStorage
const getCardsInimigos = () => {
  const cardsInimigos = localStorage.getItem("cardsInimigos");
  return cardsInimigos ? JSON.parse(cardsInimigos) : [];
};

const saveInimigos = (cardsInimigos) => {
  localStorage.setItem("cardsInimigos", JSON.stringify(cardsInimigos));
};

function MenuAddInimigo() {
  const [fieldNome, setFieldNome] = useState("");
  const [fieldCa, setFieldCa] = useState("");
  const [fieldPv, setFieldPv] = useState("");
  const [fieldMod, setFieldMod] = useState("");
  const [fieldRolagem, setFieldRolagem] = useState("");
  const [fieldCondicao, setFieldCondicao] = useState("");
  const [inimigosDoGrupo, setInimigosDoGrupo] = useState([]);
  const [cardsInimigos, setCardsInimigos] = useState([]);

  // Carregar cards de inimigos armazenados no localStorage ao inicializar
  useEffect(() => {
    saveInimigos(cardsInimigos);
  }, [cardsInimigos]);

  const adicionarAoGrupo = (event) => {
    event.preventDefault();

    const novoInimigoDoGrupo = {
      id: Date.now(),
      nome: fieldNome,
      ca: fieldCa,
      pv: fieldPv,
      mod: fieldMod,
      rolagem: fieldRolagem,
      condicao: fieldCondicao,
    };
    console.log("Novo Inimigo:", novoInimigoDoGrupo);

    const cardGrupoDeInimigos = [...inimigosDoGrupo, novoInimigoDoGrupo];
    setInimigosDoGrupo(cardGrupoDeInimigos);
  };

  const limparCampos = () => {
    setFieldNome("");
    setFieldCa("");
    setFieldPv("");
    setFieldMod("");
    setFieldRolagem("");
    setFieldCondicao("");
  };

  /* Limpar as consts de criação do inimigo no botão de enviar  */
  const adicionarInimigo = (event) => {
    event.preventDefault();

    const novoInimigo = {
      id: Date.now(),
      nome: fieldNome,
      ca: fieldCa,
      pv: fieldPv,
      mod: fieldMod,
      rolagem: fieldRolagem,
      condicao: fieldCondicao,
    };
    console.log("Novo Inimigo:", novoInimigo);

    const cardsInimigosAtualizados = [...cardsInimigos, novoInimigo];
    setCardsInimigos(cardsInimigosAtualizados);

    limparCampos();
  };

  return (
    <div className="menu-add-inimigo">
      <div className="menu-add-inimigo header">
        <h1>Adicionar Inimigo</h1>
      </div>
      <div className="menu-add-inimigo menu-add-inimigo-corpo">
        <form id="add-inimigo">
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            value={fieldNome}
            name="nome"
            onChange={(event) => setFieldNome(event.target.value)}
          />
          <br />
          <label htmlFor="ca">CA:</label>
          <input
            type="number"
            value={fieldCa}
            name="ca"
            onChange={(event) => setFieldCa(event.target.value)}
          />
          <br />
          <label htmlFor="pv">PV:</label>
          <input
            type="number"
            value={fieldPv}
            name="pv"
            onChange={(event) => setFieldPv(event.target.value)}
          />
          <br />
          <label htmlFor="mod">Mod:</label>
          <input
            type="number"
            value={fieldMod}
            name="mod"
            onChange={(event) => setFieldMod(event.target.value)}
          />
          <br />
          <label htmlFor="rolagem">Rolagem:</label>
          <input
            type="text"
            value={fieldRolagem}
            name="rolagem"
            onChange={(event) => setFieldRolagem(event.target.value)}
          />
          <br />
          <label htmlFor="condicao">Condição:</label>
          <input
            type="text"
            value={fieldCondicao}
            name="condicao"
            onChange={(event) => setFieldCondicao(event.target.value)}
          />
          <br />
          <button
            className="botao-add-inimigo"
            type="submit"
            onClick={adicionarInimigo}
          >
            Enviar Inimigo Único
          </button>
          <button
            className="botao-add-inimigo"
            type="submit"
            onClick={adicionarAoGrupo}
          >
            Adicionar outro ao grupo
          </button>
          <button className="botao-add-inimigo" type="submit">
            Enviar Grupo
          </button>
        </form>
      </div>
    </div>
  );
}

export default MenuAddInimigo;
