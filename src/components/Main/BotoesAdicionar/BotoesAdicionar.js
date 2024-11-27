import MenuAddPlayer from '../MenuAddPlayer/MenuAddPlayer';
import styles from './BotoesAdicionar.css';

export default function BotoesAdicionar() {
    return (
        <div className="botoes-adicionar">
            <button className="botao-adicionar botao-adicionar-player">Adicionar Player</button>
            <MenuAddPlayer />
            <button className="botao-adicionar botao-adicionar-inimigo">Adicionar Inimigo</button>
        </div>
    );
}