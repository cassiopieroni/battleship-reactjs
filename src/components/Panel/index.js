import React from 'react';

import MessageBox from '../MessageBox';
import Counters from '../Counters';
import Timer from '../Timer';

import './style.css';


const Panel = ({ stage, restartingGame, message, score, numFleets }) => (

    <section className='panelArea'>
        <div className='panel'>
            
            <MessageBox message={ message } />

            <Counters score={ score } numFleets={ numFleets } />

            <Timer stage={ stage } />

            <button onClick={ restartingGame } className="restartButton">
                RESTART
            </button>
                        
        </div>
    </section>
)

export default Panel;