import { createFleets } from './index';

export const createCompleteBoard = boardLevel => {

    const { boardSidesSize, numFleets, numOfShipsPerFleet } = boardLevel;
    const fleets = createFleets(boardSidesSize, numFleets, numOfShipsPerFleet);
    return createBoard(boardSidesSize, fleets);
}


function createBoard(boardSideSize, fleets) {

    const amountTargets = Array(boardSideSize ** 2).fill(null);
    const completeTargets = addTargetsInfos(amountTargets, boardSideSize, fleets);
    return createTargetsInLines(completeTargets, boardSideSize);
}


const addTargetsInfos = (targets, boardSidesSize, fleets) => {

    let accLine = 0;
    let accCol = 0;

    const addPositionInfos = () => Object.assign({}, { 
        id: `${accLine}${accCol}`, 
        line: accLine, 
        col: accCol 
    });

    const breakLine = () => {
        accLine ++;
        accCol = 0; 
    }

    const createTheFirstTargetInARow = () => { // except the first target in the first line.
        breakLine();
        return createTarget();
    }

    const createTarget = () => {
        const newTarget = addPositionInfos()
        accCol++;
        return addShipInfos(newTarget, fleets);
    }

    return targets.map( (tg, i) => {
        return (i % boardSidesSize === 0 && i !== 0) ? createTheFirstTargetInARow() : createTarget();
    })
}


const addShipInfos = (target, fleets) => {

    if ( fleets.length === 0 )
        return { ...target, tookShot: false, isShip: false }

    if ( fleets[0].locations.includes(target.id) )
        return { ...target, tookShot: false, isShip: true, fleetId: fleets[0].id }

    return addShipInfos( target, fleets.slice(1) );
}


const createTargetsInLines = (completeTargets, boardSidesSize) => {

    const lines = Array(boardSidesSize).fill(null);

    return lines.map( ( _, i) => (

        completeTargets.filter( tg => (tg.line === i) )
    ));
};
