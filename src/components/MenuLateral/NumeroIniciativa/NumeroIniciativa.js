import React from "react";
export default function NumeroIniciativa(prop) {
  return (
    <div className="flex w-[25px] text-xl text-[var(--bege)] justify-center">
      <p>{prop.iniciativa}</p>
    </div>
  );
}
