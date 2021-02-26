/**
 * Caixa de desafios
 * @author Moser Diogo
 * @copyright RocketSeat
 * Projeto elaborado por https://rocketseat.com.br e codificado pelo autor acima citado.
 */
import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox() {

    const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengeContext)
    const { resetCountdown } = useContext(CountdownContext);

    // Executado ao clicar no botão 'Completei'
    function handleChallengeSucceded() {
        
        // Cálculo de pontos e level do usuário
        completeChallenge();

        // Reseta o contador
        resetCountdown();
    }

    // Executado ao clicar no botão 'Falhei'
    function handleChallengeFailed() {

        // Reseta o desafio
        resetChallenge();

        // Reseta o contador
        resetCountdown();
    }

    return (
        <div className={styles.challengeBoxContainer}>
            { activeChallenge ? (
                <div className={styles.challengeActive}>
                    <header>Ganhe {activeChallenge.amount} xp</header>

                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} alt="Body"/>
                        <strong>Novo desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>

                    <footer>
                        <button
                            type="button"
                            className={styles.challengeFailedButton}
                            onClick={handleChallengeFailed}
                        >
                            Falhei
                        </button>

                        <button
                        type="button"
                        className={styles.challengeSuccededButton}
                        onClick={handleChallengeSucceded}
                        >
                            Completei
                        </button>
                    </footer>
                </div>
            ) : (
                <div className={styles.challengeBoxNotActive}>
                    <strong>Finalize um ciclo para receber desafios</strong>
                    <p>
                        <img src="icons/level-up.svg" alt="Level Up"/>
                        Avance de level completando desafios.
                    </p>
                </div>

            )}
        </div>
    );
}