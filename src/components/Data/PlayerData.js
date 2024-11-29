import React, {Children, createContext, useState} from 'react';

// Criação do contexto
export const PlayerDataContext = createContext();

// Provedor do contexto
export const PlayerDataProvider = ({ children }) => {

    const [playerData, setPlayerData] = useState({
        id: "",
        iniciativa: "",
        fieldNome: "",
        fieldCa: "",
        fieldPv: "",
        fieldMod: "",
        fieldRolagem: "",
        fieldCondicao: "",
    });

    return (
        <PlayerDataContext.Provider value={{ playerData, setPlayerData }}>
            {children}
        </PlayerDataContext.Provider>
    );
};

