import React, { useState, useEffect } from "react";

export function Ocupation() {
  return (
    <div className="flex flex-col justify-center items-center mt-6 w-full bg-[var(--cinza-medio)] rounded-md p-1">
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
      </div>
      <div className="flex flex-row items-center w-full bg-[var(--cinza-escuro)] rounded-b-md p-6 pb-4 pt-4">
        <OcupationList />
      </div>
    </div>
  );
}

const OcupationList = () => {
  const [ocupations, setOcupations] = useState([]);
  const [selectedOcupation, setSelectedOcupation] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/ocupations")
      .then((response) => response.json())
      .then((data) => setOcupations(data))
      .catch((error) => console.error("Erro ao buscar ocupation", error));
  }, []);

  return (
    <div className="grid grid-cols-3 gap-1 w-full ">
      {Object.values(ocupations).map((ocupation) => (
        <div key={ocupation.id} className="flex flex-col items-center">
          <h1 className="font-greatVibes text-3xl">{ocupation.title}</h1>
        </div>
      ))}
    </div>
  );
};
