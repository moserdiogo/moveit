/**
 * Context API countdown
 * @author Moser Diogo
 * @copyright RocketSeat
 * Projeto elaborado por https://rocketseat.com.br e codificado pelo autor acima citado.
 */
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengeContext } from "./ChallengesContext";

interface CountdownContextData {
    time: number;
    isActive: boolean;
    hasFinished: boolean;
    minutes: number;
    seconds: number;
    startCountdown: () => void;
    resetCountdown: () => void;
}

interface CountdownProviderProps {
    children: ReactNode;
}

let countdownTimeout : NodeJS.Timeout;

export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider({children}:CountdownProviderProps) {

    const { startNewChallenge } = useContext(ChallengeContext);

    const [time, setTime] = useState(0.1 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    // Função disparada quando houver alteração no estados das variáveis identificadas no array passado como parâmetro
    useEffect(() => {

        if(isActive && time > 0) {
            
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        } else if (isActive && time === 0) {

            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
        
    }, [isActive, time, hasFinished]);

    function startCountdown() {
        setIsActive(true);
    }

    // Para o contador
    function resetCountdown() {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setHasFinished(false);
        setTime(0.1 * 60);
    }

    return(
        <CountdownContext.Provider
            value={{
                time,
                isActive,
                hasFinished,
                minutes,
                seconds,
                startCountdown,
                resetCountdown
            }}
        >
            {children}
        </CountdownContext.Provider>
    );
}