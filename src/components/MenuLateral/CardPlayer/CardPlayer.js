import React, { useState, useContext, useEffect } from "react";
import { FaPencilRuler, FaHeart } from "react-icons/fa";
import { GiCheckedShield } from "react-icons/gi";
import { PlayerDataContext } from "../../Data/PlayerData";
import './CardPlayer.css';

const CardPlayer = ({player}) => {
    const [isExpanded, setIsExpanded] = useState(true);

    // Estado inicial com os dados do jogador
    const [playerData, setPlayerData] = useState(() => {
        // Carrega os dados do localStorage (ou usa valores padrão)
        const storedData = localStorage.getItem("playerData");
        return storedData ? JSON.parse(storedData) : {
            fieldCa: "",
            fieldPv: "",
            fieldMod: "",
            fieldRolagem: "",
            fieldCondicao: ""
        };
    });

    // Atualiza localStorage sempre que o estado playerData muda
    useEffect(() => {
        localStorage.setItem("playerData", JSON.stringify(playerData));
    }, [playerData]);

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

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="card-player">
            <h1>{player.nome}</h1>
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