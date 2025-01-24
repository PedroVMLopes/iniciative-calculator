import React, { useState, useEffect } from "react";

export const ChartData = ({ selectedChart }) => {
  //console.log("selectedChart: ", selectedChart);
  selectedChart.extras.map((element) => {
    console.log("element: ", element);
  });
  if (selectedChart) {
    return (
      <div className="bg-[var(--cinza-escuro)] rounded-md p-3 mt-1">
        <h1 className="text-2xl pl-2">{selectedChart.name}</h1>
        <p className="h-[2px] my-2 mb-4 w-[70%] bg-[var(--cinza-medio)]" />
        <div className="pl-1">
          <h2>Classe de Armadura: {selectedChart.ca}</h2>
          <h2 className="py-1">Pontos de Vida: {selectedChart.pv}</h2>
          <h2>Deslocamento: {selectedChart.mov}</h2>
        </div>
        <p className="h-[2px] my-4 w-[70%] bg-[var(--cinza-medio)]" />
        <div className="flex flex-row justify-evenly">
          <div className="flex flex-col">
            <h1>FOR</h1>
            <h1>{selectedChart.stats.for}</h1>
          </div>
          <div className="flex flex-col items-center">
            <h1>DES</h1>
            <h1>{selectedChart.stats.dex}</h1>
          </div>
          <div className="flex flex-col items-center">
            <h1>CON</h1>
            <h1>{selectedChart.stats.con}</h1>
          </div>
          <div className="flex flex-col items-center">
            <h1>INT</h1>
            <h1>{selectedChart.stats.int}</h1>
          </div>
          <div className="flex flex-col items-center">
            <h1>SAB</h1>
            <h1>{selectedChart.stats.wis}</h1>
          </div>
          <div className="flex flex-col items-center">
            <h1>CAR</h1>
            <h1>{selectedChart.stats.car}</h1>
          </div>
        </div>
        <p className="h-[2px] my-4 w-[70%] bg-[var(--cinza-medio)]" />
        <div className="pl-1 flex flex-col justify-evenly">
          <h2>Testes de Resistência: {selectedChart.resistanceTests}</h2>
          <h2>Perícias: {selectedChart.expertises}</h2>
          <h2>Resistência a Dano: {selectedChart.damageResistances}</h2>
          <h2>Sentidos: {selectedChart.senses}</h2>
          <h2>Idiomas: {selectedChart.lenguages}</h2>
          <h2>Nível de Desafio: {selectedChart.cr}</h2>
        </div>
        <p className="h-[2px] my-4 w-[70%] bg-[var(--cinza-medio)]" />
        <div>
          {selectedChart.extras.map((element) => (
            <p className="pl-1 py-2">{element}</p>
          ))}
        </div>
        <div>
          <h1 className="pl-1 pt-4">Ações:</h1>
          {selectedChart.actions.map((element) => (
            <p className="pl-1 py-2">{element}</p>
          ))}
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};
