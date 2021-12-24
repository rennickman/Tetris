import { useCallback, useState } from 'react';

import { STAGE_WIDTH } from '../gameHelpers';
import { TETROMINOS, randomTetromino } from '../tetrominos';





// Custom hook for Updating Player
export const usePlayer = () => {

    // Set the Initial state for the player
    const [player, setPlayer] = useState({
        pos: { x: 0, y: 0 },
        tetromino: TETROMINOS[0].shape,
        collided: false
    });



    // Method for Updating the Player Position
    const updatePlayerPos = ({ x, y, collided }) => {

        // Update x and y coordinates and collided state of Player in state
        setPlayer(prev => ({
            ...prev,
            pos: { x: (prev.pos.x += x), y: (prev.pos.y += y)},
            collided
        }));
    };


    // Method for Reseting the Player
    const resetPlayer = useCallback(() => {

        // Reset Player State - Place Piece in center of Stage
        setPlayer({
            pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
            tetromino: randomTetromino().shape,
            collided: false
        });
    }, []);


    return [player, updatePlayerPos, resetPlayer];
};