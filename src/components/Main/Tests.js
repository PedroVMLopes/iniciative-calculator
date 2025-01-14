import React from "react";
import { AbilitiesList } from "./AbilitiesList";

/* Ícones */
import { FaFeatherAlt } from "react-icons/fa";

const Tests = () => {
  const isExpanded = false;

  const AbilityCard = ({ name, description, examples, icon, color }) => {
    const newColor = color;
    return (
      <div className="flex flex-col p-2  rounded-lg bg-[var(--cinza-escuro)] shadow-xl">
        <div className="flex flex-row border-b-2">
          <div
            className={`text-5xl flex items-center`}
            style={{ color: newColor }}
          >
            {icon}
          </div>
          <div className="ml-2">
            <h2 className="font-bold font-unifraktur text-lg">{name}</h2>
            <h3>{description}</h3>
          </div>
        </div>
        <div className="pt-2">
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
    );
  };

  return (
    <div className="flex flex-col items-center text-white">
      <h1 className="font-bold font-unifraktur text-3xl pt-4">Hablilidades</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-1 p-1 text-[var(--bege)] bg-[var(--cinza-medio)] rounded-xl m-2 mt-4">
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
    </div>
  );
};

export default Tests;
