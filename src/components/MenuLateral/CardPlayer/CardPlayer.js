import React, { useState, useContext } from "react";
import { FaPencilRuler, FaHeart } from "react-icons/fa";
import { GiCheckedShield } from "react-icons/gi";
import { PlayerDataContext } from "../../Data/PlayerData";
import './CardPlayer.css';

const CardPlayer = () => {

    const { players, updatePlayer } = useContext(PlayersContext);

    const { playerData, setPlayerData } = useContext(PlayerDataContext);

    const [isExpanded, setIsExpanded] = useState(true);

    const toggleExpand = () => {
        setIsExpanded((prevState) => !prevState);
    };

    const handleChange = (e) => {
        const { name, value } = e.target; // Obtém o nome e valor do input
        setPlayerData((prevData) => ({
            ...prevData,
            [name]: value, // Atualiza o campo correspondente
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form data submitted:", playerData);
    };

    return (
        <div className="card-player">
            <h1>{playerData.fieldNome}</h1>
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
                        <button type="submit" onClick={toggleExpand}>
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