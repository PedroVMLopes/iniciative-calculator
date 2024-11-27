import React, {Children, createContext, useState} from 'react';

// Criação do contexto
export const PlayerDataContext = createContext();

// Provedor do contexto
export const PlayerDataProvider = ({ children }) => {

    const [playerData, setPlayerData] = useState({
        id: 1,
        iniciativa: 0,
        fieldNome: "Nome do Player",
        fieldCa: "10",
        fieldPv: "100",
        fieldMod: "2",
        fieldRolagem: "12",
        fieldCondicao: "Normal",
    });

    return (
        <PlayerDataContext.Provider value={{ playerData, setPlayerData }}>
            {children}
        </PlayerDataContext.Provider>
    );
};

