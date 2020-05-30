import React, { useState, useEffect, useCallback } from 'react';

import Board from '../components/Board';
import Panel from '../components/Panel';

import { initialData, boardLevel } from './data';
import { updateBoard, isSankAllShipsInFleet, isSankAllFleets } from '../helpers';

import './style.css';


const GameContainer = () => {

    const { initMessage, initScore, initStage, createBoard } = initialData;
    const { numFleets, numOfShipsPerFleet } = boardLevel;


    const [board, setBoard] = useState( createBoard());
    const [message, setMessage] = useState( initMessage);
    const [score, setScore] = useState( initScore);
    const [stage, setStage] = useState( initStage);
    const [lastShootedTarget, setLastShootedTarget] = useState( {});

    
    // --------------------------------- LIFE CYCLES --------------------------------------------
    useEffect( () => {
        const sinkingFleet = () => {
            setScore( state => ({ ...state, sankFleets: state.sankFleets + 1 }) );
            setMessage('You sank an entire fleet!!!');
        }

        if (isSankAllShipsInFleet(lastShootedTarget, score.hitsOnFleets, numOfShipsPerFleet))  
            sinkingFleet();

    }, [lastShootedTarget, score.hitsOnFleets, numOfShipsPerFleet]);


    useEffect( () => {
        const endingGame = () => {
            setMessage('YOU WIN!!! You sank all fleets');
            setStage({ isEndGame: true, isTimer: false });
        }
        
        if (isSankAllFleets(score.sankFleets, numFleets))  
            endingGame();

    }, [score.sankFleets, numFleets]);
    // --------------------------------- LIFE CYCLES --------------------------------------------

    

    // ------------------------------ CALLBACK FUNCTIONS -------------------------------------
    const handleShot = useCallback( target => {

        const newShootedTarget = { ...target, tookShot: true };

        const updateShot = () => {
            setScore( state => ({ ...state, shots: state.shots + 1 }) );
            setStage( state => ({ ...state, isTimer: true }) );
            setBoard( state => updateBoard( newShootedTarget, state) );
            setLastShootedTarget( newShootedTarget);
        }

        const handleHit = () => {
            setMessage( 'HIT!');
            setScore( state => ({
                ...state,
                hits: state.hits + 1,
                hitsOnFleets: state.hitsOnFleets.map((hits, i) => (newShootedTarget.fleetId === i) ? (hits + 1) : hits )
            }) );
        };
        

        if (!stage.isEndGame) {
            updateShot();
            return (newShootedTarget.isShip) ? handleHit() : setMessage( 'Water!');
        }
    }, [stage.isEndGame]);


    const handleClickRestartGame = () => {

        setBoard( createBoard());
        setMessage( initMessage);
        setScore( initScore);
        setStage( initStage);
        setLastShootedTarget( {});
    };
    // ------------------------------ CALLBACK FUNCTIONS -------------------------------------

    
    return (

        <div className ='game'>
                    
            <Board 
                board={ board }
                isEndGame={ stage.isEndGame }
                handleShot={ handleShot }
            />                

            <Panel 
                stage={ stage }
                message={ message }
                score={ score }
                numFleets={ numFleets }
                restartingGame={ handleClickRestartGame }
            />

        </div>  
    )
};

export default GameContainer;