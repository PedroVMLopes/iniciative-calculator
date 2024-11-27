import styles from './MenuAddPlayer.css';
import './MenuAddPlayer.css';
import { IoIosCloseCircle } from "react-icons/io";


export default function MenuAddPlayer() {
    return (
        <div className="menu-add-player">
            <h1>Adicionar Player  </h1>
            <IoIosCloseCircle className='botao-fechar' size={28}/>
        </div>
    );
}