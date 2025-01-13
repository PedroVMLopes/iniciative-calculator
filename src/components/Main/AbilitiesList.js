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
    description: "Mede a potencia fisica e o treinamento atletico",
    examples: [
      "Libertar-se de amarras",
      "Tombar uma estátua",
      "Quebrar correntes e algemas",
    ],
    icon: <GiWeightLiftingUp />,
  },
  {
    id: 2,
    name: "Destreza",
    description: "Mede a agilidade, reflexos e equilíbrio",
    examples: [
      "Abrir uma fechadura",
      "Desarmar uma armadilha",
      "Escapar de amarras",
    ],
    icon: <GiNinjaHeroicStance />,
  },
  {
    id: 3,
    name: "Constituição",
    description: "Mede a saúde, resistência e resiliência",
    examples: [
      "Segurar a respiração",
      "Sobreviver sem comida",
      "Ficar sem dormir",
    ],
    icon: <GiHealthNormal />,
  },
  {
    id: 4,
    name: "Inteligência",
    description: "Mede a memória, raciocínio e estudo",
    examples: [
      "Estimar o valor de um item precioso",
      "Recordar um conhecimento",
      "Reconhecer um feitiço",
    ],
    icon: <GiBrain />,
  },
  {
    id: 5,
    name: "Sabedoria",
    description: "Conhecimento do mundo ao seu redor",
    examples: [
      "Obter um pressentimento sobre o que fazer",
      "Analiasr características de uma criatura",
    ],
    icon: <GiWisdom />,
  },
  {
    id: 6,
    name: "Carisma",
    description:
      "Capacidade de interagir com os outros, confiança e eloquência",
    examples: [
      "Achar a melhor pessoa para saber sobre notícias rumores e boatos",
      "Misturar-se na multidão",
    ],
    icon: <FaMasksTheater />,
  },
];
