import React, { useState, useEffect } from "react";

const PremadeCharts = () => {
  const [charts, setCharts] = useState("");
  const [selectedChart, setSelectedChart] = useState("");
  const [hoverDescription, setHoverDescription] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/mastersCharacters")
      .then((res) => res.json())
      .then((data) => setCharts(data))
      .catch("Erro ao carregar fichas prontas.");
  }, []);

  return (
    <div className="flex flex-col justify-center items-center text-white w-[98%]">
      <h1 className="font-bold font-unifraktur text-3xl pt-4">
        Fichas Prontas
      </h1>
      <div className="flex flex-row w-full mt-6">
        <div className="">
          <ChartsList
            charts={charts}
            setSelectedChart={setSelectedChart}
            setHoverDescription={setHoverDescription}
          />
        </div>
        <div className="w-full ml-2 bg-[var(--cinza-medio)] rounded-md p-1">
          <ChartDescription
            selectedChart={selectedChart}
            hoverDescription={hoverDescription}
          />
          <ChartData selectedChart={selectedChart} />
        </div>
      </div>
    </div>
  );
};

const ChartsList = ({
  charts,
  selectedChart,
  setSelectedChart,
  setHoverDescription,
}) => {
  const handleMouseEnter = (selectedChart) => {
    setHoverDescription(selectedChart.description);
  };

  const handleMouseLeave = () => {
    setHoverDescription(null);
  };

  return (
    <div className="w-min min-w-48 bg-[var(--cinza-medio)] rounded-md p-1 shadow-xl">
      <div className="bg-[var(--cinza-escuro)] rounded-md p-2">
        <h1 className="flex justify-center p-1 font-bold text-xl">
          Lista De Fichas
        </h1>
        <div className="flex flex-col items-start p-1">
          {Object.values(charts).map((chart) => (
            <button
              key={chart.name}
              onClick={() => setSelectedChart(chart)}
              onMouseEnter={() => handleMouseEnter(chart)}
              onMouseLeave={handleMouseLeave}
              className="my-1"
            >
              <h1>{chart.name}</h1>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const ChartDescription = ({ selectedChart, hoverDescription }) => {
  return (
    <div className="bg-[var(--cinza-escuro)] rounded-md p-3">
      <h1 className="font-greatVibes text-3xl text-[var(--bege)]">Descrição</h1>
      <p className="p-2 pl-0 pt-1">
        {hoverDescription ? hoverDescription : selectedChart.description}
      </p>
    </div>
  );
};

const ChartData = ({ selectedChart }) => {
  //console.log("selectedChart: ", selectedChart);
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
        <div className="pl-1 flex flex-col justify-evenly h-32">
          <h2>Testes de Resistência: {selectedChart.resistanceTests}</h2>
          <h2>Perícias: {selectedChart.expertises}</h2>
          <h2>Resistência a Dano: {selectedChart.damageResistances}</h2>
          <h2>Sentidos: {selectedChart.senses}</h2>
          <h2>Idiomas: {selectedChart.lenguages}</h2>
          <h2>Nível de Desafio: {selectedChart.cr}</h2>
        </div>
        <p className="h-[2px] my-4 w-[70%] bg-[var(--cinza-medio)]" />
        {selectedChart.extras.map((element) => {
          <p>{element}</p>;
        })}
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default PremadeCharts;
