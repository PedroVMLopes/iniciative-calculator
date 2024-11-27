import BotoesAdicionar from '../Main/BotoesAdicionar/BotoesAdicionar';
import CardPlayer from './CardPlayer/CardPlayer';
import styles from './MenuLateral.css';

export default function MenuLateral() {
    return (
        <div className="menu-lateral">
            <h1>CONTAGEM DE INICIATIVA</h1>
            <div className='CardLinhaDeIniciativa'>
                <CardPlayer /> <h1> 1 </h1>
            </div>
        </div>
    );
}