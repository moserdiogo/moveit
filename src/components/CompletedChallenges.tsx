/**
 * Desafios completados
 * @author Moser Diogo
 * @copyright RocketSeat
 * Projeto elaborado por https://rocketseat.com.br e codificado pelo autor acima citado.
 */
import styles from '../styles/components/CompletedChallenges.module.css';
import { ChallengeContext } from '../contexts/ChallengesContext';
import { useContext } from 'react';

export function CompletedChallenges() {

    // Quantidade de desafios completados
    const { challengesCompleted } = useContext(ChallengeContext);

    return (
        <div className={styles.completedChallengesContainer}>
            <span>Desafios completos</span>
            <span>{challengesCompleted}</span>
        </div>
    );
}