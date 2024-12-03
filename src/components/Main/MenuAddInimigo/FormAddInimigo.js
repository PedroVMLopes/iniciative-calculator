import "./MenuAddInimigo.css";
import React, { useContext, useState } from "react";
import { FormAddInimigoContext } from "./MenuAddInimigo";

// Função que obtém os cards de inimigos armazenados no localStorage
const getCardsInimigos = () => {
  const cardsInimigos = localStorage.getItem("cardsInimigos");
  return cardsInimigos ? JSON.parse(cardsInimigos) : [];
};

function FormAddInimigo() {
  const { isExpanded, setIsExpanded } = React.useContext(FormAddInimigoContext);

  const [fieldNome, setFieldNome] = useState("");
  const [fieldCa, setFieldCa] = useState("");
  const [fieldPv, setFieldPv] = useState("");
  const [fieldMod, setFieldMod] = useState("");
  const [fieldRolagem, setFieldRolagem] = useState("");
  const [fieldCondicao, setFieldCondicao] = useState("");
  const [inimigosDoGrupo, setInimigosDoGrupo] = useState([]);
  const [cardsInimigos, setCardsInimigos] = useState([]);

  const adicionarAoGrupo = (event) => {
    event.preventDefault();
    setIsExpanded((prevState) => !prevState);

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

  /* Limpar as consts de criação do inimigo no botão de enviar  */

  return (
    <div className="menu-add-inimigo menu-add-inimigo-corpo">
      {!isExpanded && (
        <div className="menu-add-inimigo inimigo-adicionado">
          <h1>Inimigo Criado</h1>
        </div>
      )}

      {isExpanded && (
        <form id="add-inimigo">
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            onChange={(event) => setFieldNome(event.target.value)}
          />
          <br />
          <label htmlFor="ca">CA:</label>
          <input
            type="number"
            id="ca"
            name="ca"
            onChange={(event) => setFieldCa(event.target.value)}
          />
          <br />
          <label htmlFor="pv">PV:</label>
          <input
            type="number"
            id="pv"
            name="pv"
            onChange={(event) => setFieldPv(event.target.value)}
          />
          <br />
          <label htmlFor="mod">Mod:</label>
          <input
            type="number"
            id="mod"
            name="mod"
            onChange={(event) => setFieldMod(event.target.value)}
          />
          <br />
          <label htmlFor="rolagem">Rolagem:</label>
          <input
            type="text"
            id="rolagem"
            name="rolagem"
            onChange={(event) => setFieldRolagem(event.target.value)}
          />
          <br />
          <label htmlFor="condicao">Condição:</label>
          <input
            type="text"
            id="condicao"
            name="condicao"
            onChange={(event) => setFieldCondicao(event.target.value)}
          />
          <br />
          <button className="botao-add-inimigo" type="submit">
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
      )}
    </div>
  );
}

export default FormAddInimigo;
