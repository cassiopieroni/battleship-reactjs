import { createCompleteBoard } from '../helpers';


export const boardLevel = {
    boardSidesSize: 7, 
    numFleets: 3,
    numOfShipsPerFleet: 3,
}

export const initialData = {
    initMessage: 'Take your first shot to start the game',
    createBoard: () => createCompleteBoard(boardLevel),
    initScore: {
        shots: 0,
        hits: 0,
        sankFleets: 0,
        hitsOnFleets: Array(boardLevel.numFleets).fill(0),
    },
    initStage: {
        isEndGame: false,
        isTimer: false,
    },
}