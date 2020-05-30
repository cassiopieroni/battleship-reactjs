import React from 'react';

import ship from '../../assets/ship-42x42.png'
import water from '../../assets/sea-32x32.png';

import './style.css'


const HiddenTarget = ({ handleShot, isEndGame }) => {

    const classStyle = (isEndGame) ? 'target target-tookShot' : 'target';

    return <div className={classStyle} onClick={ handleShot }/>
}


const ExposedTarget = ({ target }) => (

    <div className='target target-tookShot'>
        { target.isShip ? <img src={ship} alt='ship'/> : <img src={water} alt='water'/> }
    </div>
)


const Target = React.memo( ({ target, handleShot, isEndGame })  => ( 
    
    target.tookShot
        ? <ExposedTarget target={target} />
        : <HiddenTarget handleShot={ () => handleShot(target) } isEndGame={ isEndGame } />
));

export default Target;