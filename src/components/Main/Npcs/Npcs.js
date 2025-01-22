import React from "react";
import { Behavior } from "./Behavior";
import { Ocupation } from "./Ocupation";
import { UniqueTrait } from "./UniqueTrait";

const Npcs = () => {
  return (
    <div className="flex flex-col justify-center items-center text-white w-[97%] ">
      <h1 className="font-bold font-unifraktur text-3xl pt-4">
        Criador de NPC
      </h1>
      <Behavior />
      <Ocupation />
      <UniqueTrait />
    </div>
  );
};

export default Npcs;
