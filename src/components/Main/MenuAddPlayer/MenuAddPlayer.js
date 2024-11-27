import './MenuAddPlayer.css';
import { IoIosCloseCircle } from "react-icons/io";


export default function MenuAddPlayer() {
    return (
        <div className='menu-add-player'>
            <div className="menu-add-player menu-add-player-header">
                <h1>Adicionar Player  </h1>
                <IoIosCloseCircle className='botao-fechar' size={28}/>
            </div>
            <div className="menu-add-player menu-add-player-corpo">
                <form>
                    <label>Nome:</label>
                    <input type="text" name="playerName" />
                    <label>CA:</label>
                    <input type="text" name="playerCa" />
                    <label>PV:</label>
                    <input type="text" name="playerPv" />
                    <label>MOD:</label>
                    <input type="text" name="playerMod" />
                    <label>Rolagem:</label>
                    <input type="text" name="playerRolagem" />
                    <button type="submit">Adicionar</button>
                </form>
            </div>
        </div>
        
    );
}