import React, { useState, useEffect } from "react";
import { FaFeatherAlt } from "react-icons/fa";
import { FaEraser } from "react-icons/fa";

export function Behavior() {
  const [behaviors, setBehaviors] = useState([]);

  const [selectedTraits, setSelectedTraits] = useState({
    positive: "",
    negative: "",
    neutral: "",
  });

  useEffect(() => {
    fetch("http://localhost:5000/behaviors")
      .then((response) => response.json())
      .then((data) => setBehaviors(data))
      .catch((error) => console.error("Erro ao buscar behaviors", error));
  }, []);

  const selectRandomTraits = () => {
    const newSelectedTraits = {};
    for (const [key, value] of Object.entries(behaviors)) {
      newSelectedTraits[key] =
        value.traits[Math.floor(Math.random() * value.traits.length)];
    }
    setSelectedTraits(newSelectedTraits);
  };

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
          <Traits
            behaviors={behaviors}
            selectedTraits={selectedTraits}
            setSelectedTraits={setSelectedTraits}
          />
        </div>
        <div className="flex flex-row justify-end w-full">
          <button
            className="animate-pulse p-2 m-2 mr-1 rounded-md bg-[var(--cinza-escuro)] hover:bg-[var(--laranja)] shadow-xl"
            onClick={selectRandomTraits}
          >
            Selecionar Aleatoriamente
          </button>
          <button
            className="animate-pulse p-2 m-2 ml-0 rounded-md bg-[var(--cinza-escuro)] hover:bg-[var(--laranja)] shadow-xl"
            onClick={() =>
              setSelectedTraits({ positive: "", negative: "", neutral: "" })
            }
          >
            <FaEraser />
          </button>
        </div>
      </div>
    </div>
  );
}

const Traits = ({ behaviors, selectedTraits, setSelectedTraits }) => {
  const handleSelection = (key, trait) => {
    setSelectedTraits((prevState) => ({
      ...prevState,
      [key]: trait,
    }));
  };

  return (
    <div className="flex flex-row justify-evenly w-full bg-[var(--cinza-escuro)] rounded-b-md p-3">
      {Object.entries(behaviors).map(([key, value]) => (
        <div key={key} className="flex flex-col items-center rounded-md">
          <h1 className="font-greatVibes text-3xl">{value.title}</h1>
          <div className="flex flex-col justify-center">
            {value.traits.map((trait) => (
              <label
                className="flex flex-row items-center my-1 group cursor-pointer"
                key={trait}
              >
                <input
                  type="radio"
                  className="hidden"
                  name={key}
                  value={trait}
                  checked={selectedTraits[key] === trait}
                  onChange={() => handleSelection(key, trait)}
                />
                <div
                  className={`flex items-center group-hover:text-[var(--laranja)] ${
                    selectedTraits[key] === trait
                      ? "text-[var(--laranja)]"
                      : "text-[var(--bege)]"
                  }`}
                >
                  <FaFeatherAlt />
                </div>
                <span className="pl-2 text-lg">{trait}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
