/**
 * Context API Challenges
 * @author Moser Diogo
 * @copyright RocketSeat
 * Projeto elaborado por https://rocketseat.com.br e codificado pelo autor acima citado.
 */
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import challenges from '../../challenges.json'; 
import Cookies from 'js-cookie';
import { LevelUpModal } from '../components/LevelUpModal';

interface ChallengesProviderProps {
    children: ReactNode;
}

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    activeChallenge: Challenge;
    experienceToNextLevel: number;
    closeLevelUpModal: () => void;
    levelUp: () => void;
    completeChallenge: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
}

export const ChallengeContext = createContext({} as ChallengesContextData);

export const ChallengesProvider = ({children}) => {
    
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience]= useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);
    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isLevelModalOpen, setIsLevelModalOpen] = useState(false);
    const experienceToNextLevel = Math.pow((level + 1) * 4,2);

    // Função disparada quando houver alteração no estados das variáveis identificadas no array passado como parâmetro
    useEffect(() => {
        Notification.requestPermission();
    }, []);

    // 
    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));

    }, [level, currentExperience, challengesCompleted]);

    function levelUp() {
        setLevel(level + 1);
        setIsLevelModalOpen(true);
    }

    function closeLevelUpModal() {
        setIsLevelModalOpen(false);
    }

    // Inicia um novo desafio
    function startNewChallenge() {

        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];
        setActiveChallenge(challenge);

        // Reproduz audio ao iniciar um novo desafio
        new Audio('/notification.mp3').play();

        // Exibe a notificação de um novo desafio
        if(Notification.permission === 'granted') {
            new Notification('Novo desafio ', {
                body: `Valendo ${challenge.amount} xp`
            });
        }
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    function completeChallenge() {

        if(!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        if(finalExperience >= experienceToNextLevel) {

            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }

    return (
        <ChallengeContext.Provider value={{
            level, 
            currentExperience,
            closeLevelUpModal,
            challengesCompleted,
            activeChallenge,
            experienceToNextLevel,
            levelUp,
            startNewChallenge,
            completeChallenge,
            resetChallenge}}
        >
            {children}

            {isLevelModalOpen &&
                <LevelUpModal />
            }
        </ChallengeContext.Provider>
    )
}