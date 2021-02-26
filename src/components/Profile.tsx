/**
 * Perfil do usuário
 * @author Moser Diogo
 * @copyright RocketSeat
 * Projeto elaborado por https://rocketseat.com.br e codificado pelo autor acima citado.
 */
import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {

    const { level } = useContext(ChallengeContext);

    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/moserdiogo.png" alt="Moser"/>
            <div>
                <strong>Moser Diogo</strong>
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level {level}
                </p>
            </div>
        </div>
    );
}