import React, { useState, useRef, useEffect, useMemo } from "react";
import { AbilitiesList } from "./AbilityList";
import { ExpertiseList } from "./ExpertiseList";
import { ExpertiseCard } from "./ExpertiseCard";

/* Ícones */
import { FaFeatherAlt } from "react-icons/fa";

const Tests = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoverColor, setHoverColor] = useState(null);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleMouseEnter = (color) => {
    setHoverColor(color);
  };

  const handleMouseLeave = () => {
    setHoverColor(null);
  };

  const filteredExpertiseList = useMemo(() => {
    return [...ExpertiseList]
      .sort((a, b) => {
        if (!hoverColor) return 0; // Sem filtro, mantém a ordem original.
        if (a.color === hoverColor && b.color !== hoverColor) return -1;
        if (a.color !== hoverColor && b.color === hoverColor) return 1;
        return 0; // Mantém a ordem relativa dos demais itens.
      })
      .map((expertise) => {
        // Se a cor do item não for a selecionada, altera para branco
        if (hoverColor && expertise.color !== hoverColor) {
          return { ...expertise, color: "var(--bege)" }; // Altera a cor para branco
        }
        return expertise; // Mantém a cor original se for a selecionada
      });
  }, [hoverColor]); // Recalcula sempre que hoverColor mudar.

  const AbilityCard = ({ name, description, examples, icon, color }) => {
    const contentRef = useRef(null); // Referência para o conteúdo do card
    const [contentHeight, setContentHeight] = useState(0); // Estado para controlar a altura do conteúdo

    useEffect(() => {
      setContentHeight(contentRef.current.scrollHeight); // Define a altura baseada no conteúdo
    }, [isExpanded]);

    return (
      <div className="flex flex-col h-full w-full justify-center font-sans text-sm">
        <div className="flex flex-row border-b-2">
          <div className={`text-5xl flex items-center`} style={{ color }}>
            {icon}
          </div>
          <div className="ml-2">
            <h2 className="font-semibold text-lg">{name}</h2>
            <h3>{description}</h3>
          </div>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out`}
          style={{
            height: isExpanded ? `${contentHeight}px` : "0px",
          }}
        >
          <div ref={contentRef} className="pt-2">
            <ul>
              {examples.map((example, index) => (
                <li className="p-1" key={index}>
                  <div className="flex flex-row text-[12px] items-center">
                    <div className="width-[12px]">
                      <FaFeatherAlt />
                    </div>
                    <p className="ml-2 text-base">{example}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col justify-center items-center text-white w-[97%] ">
      <button>
        <h1 className="font-bold font-unifraktur text-3xl pt-4 hover:text-[var(--cinza-claro)]">
          Habilidades
        </h1>
      </button>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-1 p-1 text-[var(--bege)] bg-[var(--cinza-medio)] rounded-xl m-2 mt-4 w-full">
        {AbilitiesList.map((ability, index) => (
          <div
            onMouseEnter={() => handleMouseEnter(ability.color)}
            onMouseLeave={handleMouseLeave}
            className="group flex flex-col p-2 rounded-lg bg-[var(--cinza-escuro)] shadow-xl text-left"
            key={index}
          >
            <AbilityCard
              key={ability.id}
              name={ability.name}
              description={ability.description}
              examples={ability.examples}
              icon={ability.icon}
              color={ability.color}
            />
          </div>
        ))}
      </div>
      <br />
      <h1 className="font-bold font-unifraktur text-3xl pt-4">Perícias</h1>
      <div
        className={`grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 p-1 text-[var(--bege)] bg-[var(--cinza-medio)] rounded-xl m-2 mt-4 w-full `}
      >
        {filteredExpertiseList.map((expertise) => (
          <ExpertiseCard
            key={expertise.id}
            name={expertise.name}
            description={expertise.description}
            examples={expertise.examples}
            icon={expertise.icon}
            color={expertise.color}
          />
        ))}
      </div>
      <br />
    </div>
  );
};

export default Tests;
