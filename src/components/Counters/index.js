import React from 'react';
import { countersPresentation } from '../../helpers';
import './style.css';


const Counters = ({ score, numFleets }) => {

    const { shots, hits, sankFleets } = score;
    
    return (

        <ul className='counters'>

            <li className='score-infos counter'>
                <p>Shots: </p> <span>{ countersPresentation(shots) }</span>
            </li> 
            
            <li className='score-infos counter'>
                <p>Hits: </p> <span>{ countersPresentation(hits) }</span>
            </li> 
            
            <li className='score-infos counter'>
                <p>fleets: </p> <span>{ sankFleets}/{numFleets }</span>
            </li> 
        </ul>
    )
};

export default Counters;