import React from "react";
import { GiWeightLiftingUp } from "react-icons/gi";
import {
  GiNinjaHeroicStance,
  GiHealthNormal,
  GiBrain,
  GiWisdom,
} from "react-icons/gi";
import { FaMasksTheater } from "react-icons/fa6";

export const AbilitiesList = [
  {
    id: 1,
    name: "Força",
    description: "Atletismo",
    examples: [
      "Libertar-se de amarras",
      "Tombar uma estátua",
      "Quebrar correntes e algemas",
    ],
    icon: <GiWeightLiftingUp />,
    color: "#DDA853",
  },
  {
    id: 2,
    name: "Destreza",
    description: "Acrobacia, Furtividade e Prestidigitação",
    examples: [
      "Abrir uma fechadura",
      "Desarmar uma armadilha",
      "Escapar de amarras",
    ],
    icon: <GiNinjaHeroicStance />,
    color: "#578E7E",
  },
  {
    id: 3,
    name: "Constituição",
    description: "Lutar pela vida",
    examples: [
      "Segurar a respiração",
      "Sobreviver sem comida",
      "Ficar sem dormir",
    ],
    icon: <GiHealthNormal />,
    color: "#9F5255",
  },
  {
    id: 4,
    name: "Inteligência",
    description: "Arcanismo, História, Investigação, Natureza e Religião",
    examples: [
      "Estimar o valor de um item precioso",
      "Recordar um conhecimento",
      "Reconhecer um feitiço",
    ],
    icon: <GiBrain />,
    color: "#3E5879",
  },
  {
    id: 5,
    name: "Sabedoria",
    description:
      "Adestrar Animais, Intuição, Medicina, Percepção e Sobrevivência",
    examples: [
      "Obter um pressentimento sobre o que fazer",
      "Analiasr características de uma criatura",
      "Encontrar rastros",
    ],
    icon: <GiWisdom />,
    color: "#FF7F3F",
  },
  {
    id: 6,
    name: "Carisma",
    description: "Atuação, Enganação, Intimidação e Persuasão",
    examples: [
      "Achar a melhor pessoa para saber sobre notícias rumores e boatos",
      "Misturar-se na multidão",
      "Tocar um instrumento",
    ],
    icon: <FaMasksTheater />,
    color: "#C890A7",
  },
];
