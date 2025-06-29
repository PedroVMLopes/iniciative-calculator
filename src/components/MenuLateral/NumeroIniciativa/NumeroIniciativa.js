import React from "react";
export default function NumeroIniciativa(prop) {
  return (
    <div className="flex w-[25px] text-[var(--bege)] font-sans font-semibold">
      <p>{prop.iniciativa}</p>
    </div>
  );
}
