import React, { useEffect, useState } from 'react';
import './style.css';

const Timer = ({ stage }) => {

    const { isEndGame, isTimer } = stage;

    const [timer, setTimer] = useState( 0);
    
    useEffect( () => {
        const updatingTimer = () => setTimer( state => state + 1);
        
        let interval;
        if (isTimer) {
            interval = setInterval( updatingTimer, 1000);
        }

        return () => clearInterval(interval);

    }, [isTimer]);

    useEffect( () => {
        const restartingTimer = () => setTimer( 0);

        if (!isEndGame && !isTimer && timer !== 0) restartingTimer();
    
    }, [isEndGame, isTimer, timer]);


    return (
        
        <div className='score-infos timer'>
            <p>Timer: </p> <span>{timer}s</span>
        </div>
    )
};

export default Timer;