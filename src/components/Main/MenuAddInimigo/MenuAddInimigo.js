import "./MenuAddInimigo.css";
import React, { useState, useEffect } from "react";

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
  const [cardsInimigos, setCardsInimigos] = useState(getCardsInimigos);
  const [grupoDeInimigos, setGrupoDeInimigos] = useState([]);

  // Carregar cards de inimigos armazenados no localStorage ao inicializar
  useEffect(() => {
    saveInimigos(cardsInimigos);
  }, [cardsInimigos]);

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
    if (!fieldNome || !fieldCa || !fieldPv) {
      alert("Preencha todos os campos");
      return;
    }

    const novoInimigo = {
      id: Date.now(),
      nome: fieldNome,
      ca: fieldCa,
      pv: fieldPv,
      mod: fieldMod,
      rolagem: fieldRolagem,
      condicao: fieldCondicao,
    };

    const iniciativa = Math.floor(Math.random() * 20) + 1;
    const imimigoComIniciativa = { ...novoInimigo, iniciativa: iniciativa };

    // Atualiza o estado e o localStorage diretamente
    const cardsInimigosAtualizados = [...cardsInimigos, imimigoComIniciativa];
    setCardsInimigos(cardsInimigosAtualizados);
    localStorage.setItem(
      "cardsInimigos",
      JSON.stringify(cardsInimigosAtualizados)
    );

    limparCampos();
  };

  // Adiciona o inimigo a um grupo de inimigos
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

    const cardGrupoDeInimigos = [...grupoDeInimigos, novoInimigoDoGrupo];
    setGrupoDeInimigos(cardGrupoDeInimigos);

    limparCampos();
  };

  // Envia o grupo de inimigos com a iniciativa calculada
  const enviarGrupo = (event) => {
    event.preventDefault();

    const iniciativa = Math.floor(Math.random() * 20) + 1;
    const grupoComIniciativa = {
      dados: grupoDeInimigos,
      iniciativa: iniciativa,
    };

    setGrupoDeInimigos(grupoComIniciativa);

    const cardsInimigosAtualizados = [...cardsInimigos, grupoComIniciativa];
    setCardsInimigos(cardsInimigosAtualizados);
    localStorage.setItem(
      "cardsInimigos",
      JSON.stringify(cardsInimigosAtualizados)
    );

    limparCampos();
    setGrupoDeInimigos([]);
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
            type="button"
            onClick={adicionarInimigo}
          >
            Enviar Inimigo Único
          </button>
          <button
            className="botao-add-inimigo"
            type="button"
            onClick={adicionarAoGrupo}
          >
            Adicionar outro ao grupo
          </button>
          <button
            className="botao-add-inimigo"
            type="button"
            onClick={enviarGrupo}
          >
            Enviar Grupo
          </button>
        </form>
      </div>
    </div>
  );
}

export default MenuAddInimigo;
