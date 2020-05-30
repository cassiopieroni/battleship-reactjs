export const updateBoard = (shootedTarget, board) => {

    const createNewLine = line => line.map( (target, iTarg) => (
        (iTarg === shootedTarget.col) ? { ...shootedTarget } : target
    ));
    
    return board.map( (line, iLine) => (iLine === shootedTarget.line) 
        ? createNewLine(line) 
        : line
    )
};

export const isSankAllShipsInFleet = (lastShootedTarget, hitsOnFleets, numOfShipsPerFleet) => (
    lastShootedTarget.isShip && (hitsOnFleets[lastShootedTarget.fleetId] === numOfShipsPerFleet)
);

export const isSankAllFleets = (sankFleets, numFleets) => (sankFleets === numFleets); 