import React from "react";

/* Ícones */
import { GiWeightLiftingUp } from "react-icons/gi";
import { FaFeatherAlt } from "react-icons/fa";

const Testes = () => {
  return (
    <div className="flex flex-col items-center text-white">
      <h1 className="font-bold font-unifraktur text-3xl pt-4">Hablilidades</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 text-[var(--bege)] bg-[var(--cinza-medio)] rounded-xl m-2 mt-4">
        <div className="flex flex-col p-2 m-1 rounded-lg bg-[var(--cinza-escuro)]">
          <div className="flex flex-row border-b-2">
            <div className="text-5xl flex items-center">
              <GiWeightLiftingUp />
            </div>
            <div className="ml-2">
              <h2 className="font-bold font-unifraktur text-lg">Força</h2>
              <h3>Mede a potência física e o treinamento atlético</h3>
            </div>
          </div>
          <div className="pt-2">
            <ul>
              <li className="p-1">
                <div className="flex flex-row text-[12px] items-center">
                  <div className="width-[12px]">
                    <FaFeatherAlt />
                  </div>
                  <p className="ml-2 text-base">Libertar-se de amarras</p>
                </div>
              </li>
              <li className="p-1">
                <div className="flex flex-row text-[12px] items-center">
                  <div className="width-[12px]">
                    <FaFeatherAlt />
                  </div>
                  <p className="ml-2 text-base">Tombar uma estátua</p>
                </div>
              </li>
              <li className="p-1">
                <div className="flex flex-row text-[12px] items-center">
                  <div className="width-[12px]">
                    <FaFeatherAlt />
                  </div>
                  <p className="ml-2 text-base">
                    Impedir uma grande pedra de rolar
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testes;
