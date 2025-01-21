import React, { useState, useEffect } from "react";
import { FaFeatherAlt } from "react-icons/fa";

export function Behavior() {
  return (
    <div className="flex flex-col justify-center items-center mt-6 w-full bg-[var(--cinza-medio)] rounded-md p-1">
      <div className="flex flex-col justify-center items-center w-full bg-[var(--cinza-escuro)] rounded-md">
        <div className="flex flex-row items-center w-full bg-[var(--cinza-escuro)] rounded-t-md p-6 pt-4">
          <h1 className="justify-start font-greatVibes text-3xl text-[var(--bege)]">
            Traços de Comportamento{" "}
          </h1>
          <p className="px-2">-</p>
          <h2 className="text-lg">
            Dita como será a interação dele com os jogadores
          </h2>
        </div>
        <div className="flex flex-row justify-evenly w-full">
          <Traits />
        </div>
        <div className="flex flex-row justify-end w-full">
          <button className="animate-pulse p-2 m-2 rounded-md bg-[var(--cinza-escuro)] hover:bg-[var(--laranja)] shadow-xl">
            Selecionar Aleatóriamente
          </button>
        </div>
      </div>
    </div>
  );
}

const Traits = () => {
  const [behaviors, setBehaviors] = useState([]);
  const [selectedTrait, setSelectedTrait] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/behaviors")
      .then((response) => response.json())
      .then((data) => setBehaviors(data))
      .catch((error) => console.error("Erro ao buscar behaviors", error));
  }, []);

  return (
    <div className="flex flex-row justify-evenly w-full bg-[var(--cinza-escuro)] rounded-b-md p-3">
      {Object.entries(behaviors).map(([key, value]) => (
        <div key={key} className="flex flex-col items-center rounded-md">
          <h1 className=" font-greatVibes text-3xl ">{value.title}</h1>
          <div className="flex flex-col justify-center">
            {value.traits.map((trait) => (
              <button className="flex flex-row items-center my-1 group">
                <p
                  key={trait}
                  className="text-[var(--bege)] group-hover:text-[var(--laranja)] group-focus:text-[var(--laranja)]"
                >
                  <FaFeatherAlt />
                </p>
                <div className="pl-2 text-lg">{trait}</div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
