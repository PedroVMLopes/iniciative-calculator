import React, { useState, useEffect } from 'react';
import './MenuAddPlayer.css';
import { IoIosCloseCircle } from "react-icons/io";


// Função para obter os dados armazenados no localStorage
const getPlayers = () => {
    const playersSalvos = localStorage.getItem('players');
    return playersSalvos ? JSON.parse(playersSalvos) : []; // Se não houver dados, retorna um array vazio
};


// Função para salvar os dados no localStorage
const savePlayer = (players) => {
    localStorage.setItem('players', JSON.stringify(players));
};


export default function MenuAddPlayer() {

    const [fieldNome, setFieldNome] = useState('');
    const [fieldCa, setFieldCa] = useState('');
    const [fieldPv, setFieldPv] = useState('');
    const [fieldMod, setFieldMod] = useState('');
    const [fieldRolagem, setFieldRolagem] = useState('');
    const [players, setPlayers] = useState(getPlayers()); // Carregar dados do localStorage ao inicializar


    const handleSubmit = (event) => {
        event.preventDefault();

        // Verifica se todos os campos foram preenchidos
        /*
        if (!fieldNome || !fieldCa || !fieldPv || !fieldMod) {
            alert("Preencha todos os campos");
            return;
        }
        */

        // Cria um novo objeto com os dados do formulário
        const novoPlayer = {
            id: players.length + 1,
            nome: fieldNome,
            ca: fieldCa,
            pv: fieldPv,
            mod: fieldMod,
            rolagem: fieldRolagem, 
        };
        console.log("Novo player adicionado:", novoPlayer);

        // Adiciona o novo objeto ao array de dados
        setPlayers([...players, novoPlayer]);

        // Limpa os campos do formulário após o envio
        setFieldNome('');
        setFieldCa('');
        setFieldPv('');
        setFieldMod('');
        setFieldRolagem('');

        // Salva os dados atualizados no localStorage
        try {
            savePlayer(players);
        } catch (error) {
            console.error(error);
            alert("Erro ao salvar os dados. Verifique o console para mais informações");
        }

        
        console.log("Dados salvos:", players);


    }



    return (
        <div className='menu-add-player'>
            <div className="menu-add-player menu-add-player-header">
                <h1>Adicionar Player  </h1>
                <IoIosCloseCircle className='botao-fechar' size={28}/>
            </div>
            <div className="menu-add-player menu-add-player-corpo">
                <form>
                    <label>Nome:</label>
                    <input 
                        type="text" 
                        name="playerName" 
                        value={fieldNome}
                        onChange={(e) => setFieldNome(e.target.value)}
                    />
                    <label>CA:</label>
                    <input 
                        type="text" 
                        name="playerCa" 
                        value={fieldCa}
                        onChange={(e) => setFieldCa(e.target.value)}
                    />
                    <label>PV:</label>
                    <input 
                        type="text" 
                        name="playerPv"
                        value={fieldPv}
                        onChange={(e) => setFieldPv(e.target.value)}
                    />
                    <label>MOD:</label>
                    <input 
                        type="text" 
                        name="playerMod" 
                        value={fieldMod}
                        onChange={(e) => setFieldMod(e.target.value)}
                    />
                    <label>Rolagem:</label>
                    <input 
                        type="text" 
                        name="playerRolagem" 
                        value={fieldRolagem}
                        onChange={(e) => setFieldRolagem(e.target.value)}
                    />
                    <button type="submit" onClick={handleSubmit}>Adicionar</button>
                </form>
            </div>
        </div>
        
    );
}