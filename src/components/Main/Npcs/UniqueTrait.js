import React, { useState, useEffect } from "react";
import { FaFeatherAlt } from "react-icons/fa";
import { FaEraser } from "react-icons/fa";

export const UniqueTrait = () => {
  const [uniqueTraits, setUniqueTraits] = useState(null);
  const [selectedUniqueTrait, setSelectedUniqueTrait] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/uniqueTraits")
      .then((response) => response.json())
      .then((data) => setUniqueTraits(data))
      .catch((error) => console.error("Erro ao buscar uniqueTraits", error));
  }, []);

  const eraseSelection = () => {
    setSelectedUniqueTrait("");
  };

  const randomSelection = () => {
    setSelectedUniqueTrait(Math.floor(Math.random() * 12));
  };

  return (
    <div className="flex flex-col justify-center items-center mt-6 w-full bg-[var(--cinza-medio)] rounded-md p-1 mb-6">
      <div className="flex flex-col justify-center items-center w-full bg-[var(--cinza-escuro)] rounded-md">
        <div className="flex flex-col w-full bg-[var(--cinza-escuro)] rounded-t-md p-6">
          <h1 className="font-greatVibes text-3xl text-[var(--bege)]">
            Característica Única
          </h1>
          <h2 className="font-cormorant text-lg">
            "Da uma característica única para o personagem. Desde um passatempo
            ou interesse até um conhecimento específico ou envolvimento com algo
            maior."
          </h2>
        </div>
        <div className="grid grid-cols-2 w-full gap-3 p-4 items-center">
          {uniqueTraits?.data &&
            uniqueTraits.data.map((trait, index) => (
              <div key={index} className="flex justify-evenly w-full">
                <label
                  key={index}
                  className="flex flex-row group cursor-pointer w-[80%]"
                >
                  <input
                    type="radio"
                    className="hidden"
                    name={index}
                    value={selectedUniqueTrait}
                    checked={selectedUniqueTrait === index}
                    onChange={() => setSelectedUniqueTrait(index)}
                  />
                  <div
                    className={`flex items-center group-hover:text-[var(--laranja)] ${
                      selectedUniqueTrait === index
                        ? " text-[var(--laranja)]"
                        : "text-[var(--cinza-claro)]"
                    }`}
                  >
                    <FaFeatherAlt />
                  </div>
                  <span className="pl-3 text-lg group-hover:text-[var(--cinza-claro)]">
                    {trait}
                  </span>
                </label>
              </div>
            ))}
        </div>
        <div className="flex flex-row justify-end w-full">
          <button
            className="animate-pulse p-2 m-2 mr-1 rounded-md bg-[var(--cinza-escuro)] hover:bg-[var(--laranja)] shadow-xl"
            onClick={randomSelection}
          >
            Selecionar Aleatoriamente
          </button>
          <button
            className="animate-pulse p-2 m-2 ml-0 rounded-md bg-[var(--cinza-escuro)] hover:bg-[var(--laranja)] shadow-xl"
            onClick={eraseSelection}
          >
            <FaEraser />
          </button>
        </div>
      </div>
    </div>
  );
};
