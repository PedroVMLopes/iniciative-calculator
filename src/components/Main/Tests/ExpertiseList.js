import React from "react";
import {
  GiThrowingBall,
  GiAcrobatic,
  GiRobber,
  GiCrystalBall,
  GiChurch,
  GiFlatPawPrint,
  GiLightBulb,
  GiSemiClosedEye,
  GiPineTree,
  GiCampingTent,
  GiClown,
  GiSnakeTongue,
  GiSonicShout,
} from "react-icons/gi";
import { FaUserNinja, FaHandHoldingMedical, FaSeedling } from "react-icons/fa";
import { SiBookstack } from "react-icons/si";
import { PiDetectiveFill } from "react-icons/pi";
import { IoLogoWechat } from "react-icons/io5";

export const ExpertiseList = [
  {
    id: 7,
    name: "Atletismo",
    type: "Força",
    description: "Um teste de Força",
    examples: [
      "Libertar-se de amarras",
      "Escalar um penhasco",
      "Resistir a um empurrão",
    ],
    icon: <GiThrowingBall />,
    color: "#DDA853",
  },
  {
    id: 8,
    name: "Acrobacia",
    type: "Destreza",
    description: "Um teste de Destreza",
    examples: ["Permanecer de pé", "Equilibrar em uma corda bamba"],
    icon: <GiAcrobatic />,
    color: "#578E7E",
  },
  {
    id: 9,
    name: "Furtividade",
    type: "Destreza",
    description: "Um teste de Destreza",
    examples: ["Esconder-se", "Aproximar-se sem ser visto"],
    icon: <FaUserNinja />,
    color: "#578E7E",
  },
  {
    id: 10,
    name: "Prestidigitação",
    type: "Destreza",
    description: "Um teste de Destreza",
    examples: ["'Mãos Leves'", "Plantar algo em alguém"],
    icon: <GiRobber />,
    color: "#578E7E",
  },
  {
    id: 11,
    name: "Arcanismo",
    type: "Inteligência",
    description: "Um teste de Inteligência",
    examples: [
      "Conhecimento mágico e arcano",
      "Símbolos sobrenaturais",
      "Tradições mágicas",
    ],
    icon: <GiCrystalBall />,
    color: "#3E5879",
  },
  {
    id: 12,
    name: "História",
    type: "Inteligência",
    description: "Um teste de Inteligência",
    examples: [
      "Eventos históricos e lendas antigas",
      "Disputas passadas e guerras recentes",
      "Tradições, Culturas e Civilizações",
    ],
    icon: <SiBookstack />,
    color: "#3E5879",
  },
  {
    id: 13,
    name: "Investigação",
    type: "Inteligência",
    description: "Um teste de Inteligência",
    examples: [
      "Buscar pistas e fazer deduções",
      "Descobrir segredos em locais e objetos",
      "Determinar pontos fracos e pontos fortes",
    ],
    icon: <PiDetectiveFill />,
    color: "#3E5879",
  },
  {
    id: 14,
    name: "Natureza",
    type: "Inteligência",
    description: "Um teste de Inteligência",
    examples: [
      "Conhecimento sobre o terreno",
      "Identificar plantas e animais",
      "Conhecimento sobre venenos e remédios",
    ],
    icon: <GiPineTree />,
    color: "#3E5879",
  },
  {
    id: 15,
    name: "Religião",
    type: "Inteligência",
    description: "Um teste de Inteligência",
    examples: [
      "Conhecimento sobre lendas e divindades",
      "Rituais, orações e símbolos sagrados",
      "Práticas de cultos secretos",
    ],
    icon: <GiChurch />,
    color: "#3E5879",
  },
  {
    id: 16,
    name: "Adestrar Animais",
    type: "Sabedoria",
    description: "Um teste de Sabedoria",
    examples: [
      "Acalmar um animal domesticado",
      "Intuir as intenções de um animal",
      "Controlar uma montaria em uma manobra",
    ],
    icon: <GiFlatPawPrint />,
    color: "#FF7F3F",
  },
  {
    id: 17,
    name: "Intuição",
    type: "Sabedoria",
    description: "Um teste de Sabedoria",
    examples: [
      "Determinar as verdadeiras intenções de alguém",
      "Perceber uma mentira",
      "Perceber pistas na linguagem corporal",
    ],
    icon: <GiLightBulb />,
    color: "#FF7F3F",
  },
  {
    id: 18,
    name: "Medicina",
    type: "Sabedoria",
    description: "Um teste de Sabedoria",
    examples: ["Estabilizar um ferimento", "Diagnosticar uma doença"],
    icon: <FaHandHoldingMedical />,
    color: "#FF7F3F",
  },
  {
    id: 19,
    name: "Percepção",
    type: "Sabedoria",
    description: "Um teste de Sabedoria",
    examples: [
      "Perceber uma presença",
      "Ouvir segredos ou bisbilhotar",
      "Detectar emboscadas e armadilhas",
    ],
    icon: <GiSemiClosedEye />,
    color: "#FF7F3F",
  },
  {
    id: 20,
    name: "Sobrevivência",
    type: "Sabedoria",
    description: "Um teste de Sabedoria",
    examples: [
      "Seguir rastros, caçar e se orientar",
      "Identificar sinais de perigo",
      "Evitar perigos naturais",
    ],
    icon: <GiCampingTent />,
    color: "#FF7F3F",
  },
  {
    id: 21,
    name: "Atuação",
    type: "Carisma",
    description: "Um teste de Carisma",
    examples: [
      "Entreter uma plateia",
      "Chamar atenção",
      "Tocar um instrumento",
    ],
    icon: <GiClown />,
    color: "#C890A7",
  },
  {
    id: 22,
    name: "Enganação",
    type: "Carisma",
    description: "Um teste de Carisma",
    examples: [
      "Esconder a verdade",
      "Usar um disfarce",
      "Ludibriar ou iludir alguém",
    ],
    icon: <GiSnakeTongue />,
    color: "#C890A7",
  },
  {
    id: 23,
    name: "Intimidação",
    type: "Carisma",
    description: "Um teste de Carisma",
    examples: [
      "Ameaças abertas, ações hostis e violência física",
      "Arrancar informações",
      "Quebrar uma garrafa em uma briga",
    ],
    icon: <GiSonicShout />,
    color: "#C890A7",
  },
  {
    id: 24,
    name: "Persuasão",
    type: "Carisma",
    description: "Um teste de Carisma",
    examples: [
      "Influenciar com boa índole",
      "Pedir um favor com a etiqueta adequada",
      "Negociar ou inspirar alguém",
    ],
    icon: <IoLogoWechat />,
    color: "#C890A7",
  },
];
