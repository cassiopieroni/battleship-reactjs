export const createFleets = (boardSidesSize, numFleets, numOfShipsPerFleet) => {
    
    const fleetsToFillWithLocations = createEmptyFleets(numFleets);
    return createFleetsWithLocations(numOfShipsPerFleet, boardSidesSize, fleetsToFillWithLocations);
}


const createEmptyFleets = (numFleets) => {

    return Array(numFleets).fill(null)
        .map( (_, i) => ({ id: i }) );
}


const createFleetsWithLocations = (numOfShipsPerFleet, boardSidesSize, fleetsToFill) => {

    let allDefinedLocations = [];

    return fleetsToFill.map( fleet => {
        
        let newFleetLocation = [];
        
        do {

            newFleetLocation = generateFleetLocation(numOfShipsPerFleet, boardSidesSize);

        } while ( isCollisionsBetweenFleets(newFleetLocation, allDefinedLocations));
        
        
        allDefinedLocations.push( ...newFleetLocation);

        return { ...fleet, locations: [...newFleetLocation] }
    });
}


const generateFleetLocation = (numOfShipsPerFleet, boardSidesSize) => {

    const randomNum = refMultiplier => Math.floor(Math.random() * refMultiplier)

    const limitToStartAFleet = boardSidesSize - numOfShipsPerFleet;
    const shipSpreader = randomNum(limitToStartAFleet);
    const directionPivot = randomNum(boardSidesSize);
    const isHorizontalFleet = randomNum(2); // 0 === verticalFleet; 1 === horizontalFleet
    
    const locations = Array(numOfShipsPerFleet).fill(null);
    
    return locations.map(( _, pos) => (isHorizontalFleet)
        ? `${directionPivot}${pos + shipSpreader}` // example: [21, 22, 23] represents => [ 'lineCol', 'lineCol', 'lineCol'];
        : `${pos + shipSpreader}${directionPivot}` // example: [31, 41, 51] represents => [ 'lineCol', 'lineCol', 'lineCol'];
    );
}


const isCollisionsBetweenFleets = (newLocation, definedLocations) => (
    definedLocations.some( loc => newLocation.includes(loc))
);