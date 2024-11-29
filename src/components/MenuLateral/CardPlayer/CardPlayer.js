import React, { useState, useContext, useEffect } from "react";
import { FaPencilRuler, FaHeart } from "react-icons/fa";
import { GiCheckedShield } from "react-icons/gi";
import { PlayerDataContext } from "../../Data/PlayerData";
import './CardPlayer.css';

const CardPlayer = ({player}) => {
    const [isExpanded, setIsExpanded] = useState(true);

    // Chave única para o localStorage
    const storageKey = `playerData-${player.id}`;

     // Estado para armazenar os dados do jogador
     const [playerData, setPlayerData] = useState({
        fieldCa: "",
        fieldPv: "",
        fieldMod: "",
        fieldRolagem: "",
        fieldCondicao: ""
    });


    useEffect(() => {
        // Primeiro, carrega os dados gerais do jogador da chave 'players' (caso necessário)
        const players = JSON.parse(localStorage.getItem('players')) || [];
        const playerDetails = players.find(p => p.id === player.id);

        // Em seguida, carrega os dados específicos do jogador da chave playerData-<id>
        const storedData = localStorage.getItem(storageKey);
        const playerSpecificData = storedData ? JSON.parse(storedData) : {};

        // Combine os dados gerais com os específicos
        setPlayerData(prevData => ({
            ...playerSpecificData, // dados específicos do jogador
            nome: playerDetails?.nome || "", // dados gerais
            ca: playerDetails?.ca || "",
            pv: playerDetails?.pv || "",
            mod: playerDetails?.mod || "",
            rolagem: playerDetails?.rolagem || ""
        }));
    }, [player.id, storageKey]);


    // Altera se o card está expandido ou retraído
    const toggleExpand = () => {
        setIsExpanded((prevState) => !prevState);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Atualiza o estado local e o localStorage
        setPlayerData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Atualiza localStorage sempre que o estado playerData muda
    useEffect(() => {
        if (playerData) {
            localStorage.setItem(storageKey, JSON.stringify({
                fieldCa: playerData.fieldCa,
                fieldPv: playerData.fieldPv,
                fieldMod: playerData.fieldMod,
                fieldRolagem: playerData.fieldRolagem,
                fieldCondicao: playerData.fieldCondicao
            }));
        }
    }, [playerData, storageKey]);
    

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        console.log(playerData),
        <div className="card-player">
            <h1>{playerData.nome}</h1>
            <form onSubmit={handleSubmit} className="card-player-info">
                {/* Campos do card - expandido */}
                {isExpanded && (
                    <div>
                        <label>
                            <p>
                                <GiCheckedShield />
                            </p>
                            <input
                                type="text"
                                name="fieldCa"
                                value={playerData.fieldCa}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            <p>
                                <FaHeart />
                            </p>
                            <input
                                type="text"
                                name="fieldPv"
                                value={playerData.fieldPv}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            <p>MOD: </p>
                            <input
                                type="text"
                                name="fieldMod"
                                value={playerData.fieldMod}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            <p>ROLAGEM: </p>
                            <input
                                type="text"
                                name="fieldRolagem"
                                value={playerData.fieldRolagem}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            <p>CONDICAO: </p>
                            <input
                                type="text"
                                name="fieldCondicao"
                                value={playerData.fieldCondicao}
                                onChange={handleChange}
                            />
                        </label>
                        <button type="button" onClick={toggleExpand}>
                            <FaPencilRuler /> Concluir
                        </button>
                    </div>
                )}
            </form>

            {/* Campos do card - retraído */}
            {!isExpanded && (
                <div className="card-player-info-retraido">
                    <label>
                        <GiCheckedShield />
                        <input
                            type="text"
                            name="fieldCa"
                            value={playerData.fieldCa}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        <FaHeart />
                        <input
                            type="text"
                            name="fieldPv"
                            value={playerData.fieldPv}
                            onChange={handleChange}
                        />
                    </label>
                    <button type="button" onClick={toggleExpand}>
                        <FaPencilRuler /> Editar
                    </button>
                </div>
            )}
        </div>
    );
};

export default CardPlayer;