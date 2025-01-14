import React, { useState, useRef, useEffect } from "react";
import { AbilitiesList } from "./AbilityList";
import { ExpertiseList } from "./ExpertiseList";
import { ExpertiseCard } from "./ExpertiseCard";

/* Ícones */
import { FaFeatherAlt } from "react-icons/fa";

const Tests = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Componente dos cards de habilidade do topo da tela de testes
  const AbilityCard = ({ name, description, examples, icon, color }) => {
    const contentRef = useRef(null); // Referência para o conteúdo do card
    const [contentHeight, setContentHeight] = useState(0); // Estado para controlar a altura do conteúdo

    useEffect(() => {
      setContentHeight(contentRef.current.scrollHeight); // Define a altura baseada no conteúdo
    }, [examples]); // Recalcula a altura quando o conteúdo mudar (exemplos)

    return (
      <button
        className="flex flex-col p-2 rounded-lg bg-[var(--cinza-escuro)] shadow-xl text-left"
        onClick={toggleExpand}
      >
        <div className="flex flex-row border-b-2">
          <div className={`text-5xl flex items-center`} style={{ color }}>
            {icon}
          </div>
          <div className="ml-2">
            <h2 className="font-bold font-unifraktur text-lg">{name}</h2>
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
      </button>
    );
  };

  return (
    <div className="flex flex-col justify-center items-center text-white w-[97%] ">
      <h1 className="font-bold font-unifraktur text-3xl pt-4">Habilidades</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-1 p-1 text-[var(--bege)] bg-[var(--cinza-medio)] rounded-xl m-2 mt-4 w-full">
        {AbilitiesList.map((ability) => (
          <AbilityCard
            key={ability.id}
            name={ability.name}
            description={ability.description}
            examples={ability.examples}
            icon={ability.icon}
            color={ability.color}
          />
        ))}
      </div>
      <br />
      <h1 className="font-bold font-unifraktur text-3xl pt-4">Perícias</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 p-1 text-[var(--bege)] bg-[var(--cinza-medio)] rounded-xl m-2 mt-4 w-full">
        {ExpertiseList.map((expertise) => (
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
