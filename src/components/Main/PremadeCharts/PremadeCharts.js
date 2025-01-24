import React, { useState, useEffect } from "react";
import { ChartData } from "./ChartData";

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
      <div className="flex flex-row w-full mt-6 text-lg">
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

export default PremadeCharts;
