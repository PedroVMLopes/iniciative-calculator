import "./MenuAddInimigo.css";
import React, { useState, useEffect, useRef } from "react";

// Função que obtém os cards de inimigos armazenados no localStorage
const getCardsInimigos = () => {
  const cardsInimigos = localStorage.getItem("cardsInimigos");
  return cardsInimigos ? JSON.parse(cardsInimigos) : [];
};

const saveInimigos = (cardsInimigos) => {
  localStorage.setItem("cardsInimigos", JSON.stringify(cardsInimigos));
};

export default function MenuAddInimigo() {
  const [fieldNome, setFieldNome] = useState("");
  const [fieldCa, setFieldCa] = useState("");
  const [fieldPv, setFieldPv] = useState("");
  const [fieldMod, setFieldMod] = useState("");
  const [fieldRolagem, setFieldRolagem] = useState("");
  const [fieldCondicao, setFieldCondicao] = useState("");
  const [cardsInimigos, setCardsInimigos] = useState(getCardsInimigos);

  const [grupoDeInimigos, setGrupoDeInimigos] = useState([]);
  const [numDeInimigos, setNumDeInimigos] = useState(1);

  /* Animação de renderizar o componente */
  const menuRef = useRef(null);

  useEffect(() => {
    if (menuRef.current) {
      menuRef.current.classList.add("animate-show");
    }
  }, []);

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

  /* Função para adicionar um inimigo único ao grupo  */
  const adicionarInimigo = (event) => {
    event.preventDefault();
    if (!fieldNome || !fieldCa || !fieldPv) {
      alert("Preencha todos os campos");
      return;
    }

    const novoInimigo = [
      {
        id: Date.now(),
        nome: fieldNome,
        ca: fieldCa,
        pv: fieldPv,
        mod: fieldMod,
        condicao: fieldCondicao,
      },
    ];

    const modificador = Number(fieldMod);
    const iniciativa = Math.floor(Math.random() * 20) + 1 + modificador;
    const imimigoComIniciativa = {
      dados: novoInimigo,
      iniciativa: iniciativa,
      numDeInimigos: 1,
    };

    // Atualiza o estado e o localStorage diretamente
    const cardsInimigosAtualizados = [...cardsInimigos, imimigoComIniciativa];
    setCardsInimigos(cardsInimigosAtualizados);
    console.log("cardsInimigosAtualizados", cardsInimigosAtualizados);
    localStorage.setItem(
      "cardsInimigos",
      JSON.stringify(cardsInimigosAtualizados)
    );

    limparCampos();
    window.dispatchEvent(new CustomEvent("cardsAtualizados"));
  };

  // Adiciona o inimigo a um grupo de inimigos
  const adicionarAoGrupo = (event) => {
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

    setNumDeInimigos(numDeInimigos + 1);

    limparCampos();
  };

  // Envia o grupo de inimigos com a iniciativa calculada
  const enviarGrupo = (event) => {
    event.preventDefault();
    const modificador = Number(fieldMod);
    const iniciativa = Math.floor(Math.random() * 20) + 1 + modificador;
    const grupoComIniciativa = {
      dados: grupoDeInimigos,
      iniciativa: iniciativa,
      numDeInimigos: grupoDeInimigos.length,
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
    window.dispatchEvent(new CustomEvent("cardsAtualizados"));
  };

  const deleteAllEnemies = () => {
    localStorage.removeItem("cardsInimigos");
  };

  return (
    <div
      className={`menu-add-inimigo mb-8 mx-4 z-10 shadow-xl opacity-0 transform origin-top scale-95 transition-all duration-600 ease-in-out`}
      ref={menuRef}
    >
      <div className="menu-add-inimigo header">
        <h1>Adicionar Inimigo</h1>
      </div>
      <div className="menu-add-inimigo menu-add-inimigo-corpo w-full p-4">
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
          <label htmlFor="condicao">Condição:</label>
          <input
            type="text"
            value={fieldCondicao}
            name="condicao"
            onChange={(event) => setFieldCondicao(event.target.value)}
          />
          <br />
          <button
            className="hover:bg-[var(--vermelho-claro)]"
            id="inimigo-adicionado"
            type="submit"
            onClick={adicionarInimigo}
          >
            Enviar Inimigo Único
          </button>
          <div className="flex w-full">
            <button
              className="w-full hover:bg-[var(--vermelho-claro)]"
              type="button"
              onClick={adicionarAoGrupo}
            >
              Adicionar ao grupo
            </button>
            <button
              className="w-full hover:bg-[var(--vermelho-claro)]"
              type="submit"
              onClick={enviarGrupo}
            >
              Enviar Grupo
            </button>
          </div>
          <button
            className="hover:bg-[var(--vermelho-claro)]"
            type="submit"
            onClick={deleteAllEnemies}
          >
            Apagar todos os Inimigos
          </button>
        </form>
      </div>
    </div>
  );
}
