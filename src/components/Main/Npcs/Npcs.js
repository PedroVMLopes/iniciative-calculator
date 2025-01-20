import React from "react";
import { Behavior } from "./Behavior";

const Npcs = () => {
  return (
    <div className="flex flex-col justify-center items-center text-white w-[97%] ">
      <h1 className="font-bold font-unifraktur text-3xl pt-4">
        Criador de NPC
      </h1>
      <Behavior />
    </div>
  );
};

export default Npcs;
