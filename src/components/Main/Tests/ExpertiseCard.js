import React from "react";
import { FaFeatherAlt } from "react-icons/fa";

export function ExpertiseCard({ name, description, examples, icon, color }) {
  return (
    <div className="flex flex-col p-2 rounded-lg bg-[var(--cinza-escuro)] shadow-xl text-left font-sans">
      <div className="flex flex-row border-b-2">
        <div className={`text-5xl flex items-center`} style={{ color }}>
          {icon}
        </div>
        <div className="ml-2">
          <h2 className="font-semibold text-lg">{name}</h2>
          <h3 className="text-sm">{description}</h3>
        </div>
      </div>
      <ul className="mt-2">
        {examples.map((example, index) => (
          <li className="p-1" key={index}>
            <div className="flex flex-row text-[12px] items-center">
              <div className="width-[12px] text-[var(--cinza-medio)]">
                <FaFeatherAlt />
              </div>
              <p className="ml-2 text-sm">{example}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
