import styles from './BotoesAdicionar.css';

export default function BotoesAdicionar() {
    return (
        <div className="botoes-adicionar">
            <button className="botao-adicionar botao-adicionar-player">+ Player</button>
            <button className="botao-adicionar botao-adicionar-inimigo">+ Inimigo</button>
        </div>
    );
}