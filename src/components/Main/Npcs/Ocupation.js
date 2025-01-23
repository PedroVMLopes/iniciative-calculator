import React, { useState, useEffect } from "react";
import { FaFeatherAlt, FaEraser } from "react-icons/fa";
import { GiRollingDices } from "react-icons/gi";

export function Ocupation() {
  const [ocupations, setOcupations] = useState([]);
  const [selectedOcupation, setSelectedOcupation] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/ocupations")
      .then((response) => response.json())
      .then((data) => setOcupations(data))
      .catch((error) => console.error("Erro ao buscar ocupation", error));
  }, []);

  return (
    <div className="flex flex-col justify-center items-center mt-6 w-full bg-[var(--cinza-medio)] rounded-md p-1 shadow-xl">
      <div className="flex flex-col justify-center items-center w-full bg-[var(--cinza-escuro)]">
        <div className="flex flex-row items-center w-full bg-[var(--cinza-escuro)] rounded-t-md p-6 pb-2">
          <h1 className="justify-start font-greatVibes text-3xl text-[var(--bege)]">
            Profissão ou Ocupação
          </h1>
          <p className="px-2">-</p>
          <h2 className="text-lg">
            Dita a ocupação do personagem e sua posição na sociedade
          </h2>
        </div>
        <h2 className="font-cormorant text-lg w-full px-6 pb-4">
          "As condições de Bandido podem se aplicar a outras profissões,
          permitindo que qualquer personagem possa estar envolvido com o crime."
        </h2>
        <OcupationList
          ocupations={ocupations}
          selectedOcupation={selectedOcupation}
          setSelectedOcupation={setSelectedOcupation}
        />
      </div>
    </div>
  );
}

const OcupationList = ({
  ocupations,
  selectedOcupation,
  setSelectedOcupation,
}) => {
  const handleSelection = (element) => {
    setSelectedOcupation(element);
  };
  console.log("selectedOcupation: ", selectedOcupation);

  const selectRandomOcupation = (ocupation) => {
    const newOcupationIndex = Math.floor(Math.random() * ocupation.data.length);
    setSelectedOcupation(ocupation.data[newOcupationIndex]);
  };

  return (
    <div className=" grid grid-cols-2 xl:grid-cols-3 gap-2 w-full px-6">
      {Object.values(ocupations).map((ocupation) => (
        <div
          key={ocupation.id}
          className="flex flex-col items-center mb-8 pb-3 shadow-xl"
        >
          <div className="relative w-full">
            <div
              className="flex justify-center font-greatVibes text-3xl text-[var(--cinza-claro)] mt-4"
              onClick={() => setSelectedOcupation({ index: "" })}
            >
              {ocupation.title}
            </div>
            <div className="absolute top-0 right-0">
              <button
                className="p-2 m-2 ml-0 rounded-md bg-[var(--cinza-escuro)] hover:bg-[var(--laranja)] opacity-40 hover:opacity-100 shadow-xl self-end "
                onClick={() => setSelectedOcupation({ index: "" })}
              >
                <FaEraser />
              </button>
            </div>
          </div>

          <div className="flex flex-col w-full my-3 px-6">
            {ocupation?.data &&
              ocupation.data.map((element, index) => (
                <label
                  key={element}
                  className="flex flex-row p-1 group cursor-pointer w-full "
                >
                  <input
                    type="radio"
                    className="hidden"
                    name={index}
                    value={element}
                    checked={selectedOcupation[index] === index}
                    onChange={() => handleSelection(element)}
                  />
                  <div
                    className={`flex items-center group-hover:text-[var(--laranja)] ${
                      selectedOcupation === element
                        ? "text-[var(--laranja)]"
                        : "text-[var(--cinza-claro)]"
                    } `}
                  >
                    <FaFeatherAlt />
                  </div>
                  <span className="pl-3 text-lg group-hover:text-[var(--cinza-claro)]">
                    {element}
                  </span>
                </label>
              ))}
            <button
              className={`flex items-center group text-[var(--bege)] hover:text-[var(--laranja)] ml-1 w-full`}
              onClick={() => selectRandomOcupation(ocupation)}
            >
              <div className="animate-pulse text-xl group-hover:text-[var(--laranja)]">
                <GiRollingDices />
              </div>
              <span className="pl-2 text-lg justify-start ">Randomizar</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
