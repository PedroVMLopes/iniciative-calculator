import React, { useState, useEffect } from "react";

const PremadeCharts = () => {
  const [charts, setCharts] = useState("");
  const [selectedChart, setSelectedChart] = useState("");

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
          <ChartsList charts={charts} setSelectedChart={setSelectedChart} />
        </div>
        <div className="w-full ml-2 bg-[var(--cinza-medio)] rounded-md p-1">
          <ChartDescription selectedChart={selectedChart} />
        </div>
      </div>
    </div>
  );
};

const ChartsList = ({ charts, setSelectedChart }) => {
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

const ChartDescription = ({ selectedChart }) => {
  return (
    <div className="bg-[var(--cinza-escuro)] rounded-md p-3">
      <h1 className="font-greatVibes text-2xl text-[var(--bege)]">
        Descrição da Ficha
      </h1>
      <p>{selectedChart.description}</p>
    </div>
  );
};

export default PremadeCharts;
