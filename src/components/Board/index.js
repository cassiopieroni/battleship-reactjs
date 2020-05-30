import React from 'react';
import Target from '../Target';

import './style.css';


const BoardLine = ({ children }) => (

    <div className="board-line">
        {children}
    </div>
);


const Board = ({ board, handleShot, isEndGame }) => (

    <section className="boardArea">
        <div className="board">
            { board.map( (line, i) => (
            
                <BoardLine key={i}>

                    { line.map( target => (
                        
                        <Target 
                            key={ target.id } 
                            target={ target } 
                            handleShot={ handleShot } 
                            isEndGame={ isEndGame }    
                        />
                    ))}

                </BoardLine>
            
            ))}
        </div>
    </section>
);

export default Board;