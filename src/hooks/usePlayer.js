import { useCallback, useState } from 'react';

import { checkCollision, STAGE_WIDTH } from '../gameHelpers';
import { TETROMINOS, randomTetromino } from '../tetrominos';





// Custom hook for Updating Player
export const usePlayer = () => {

    // Set the Initial state for the player
    const [player, setPlayer] = useState({
        pos: { x: 0, y: 0 },
        tetromino: TETROMINOS[0].shape,
        collided: false
    });


    // Method for rotating Tetris Pieces
    const rotate = (matrix, dir) => {

        // Transpose the rows into columns
        const rotatedTetro = matrix.map((_, index) => matrix.map(col => col[index]));

        // If rotating clockwise - reverse each row to get a rotated matrix
        if (dir > 0) {
            return rotatedTetro.map(row => row.reverse());
        }

        // If rotating anti-clockwise - return a reversed matrix
        return rotatedTetro.reverse();
    };


    // Method for rotating the Player
    const playerRotate = (stage, dir) => {

        // Clone the player
        const clonedPlayer = JSON.parse(JSON.stringify(player));

        // Rotate the Clone
        clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

        // Store x-coordinate of Clone
        const pos = clonedPlayer.pos.x;

        // Offset to keep track of how far we have moved
        let offset = 1;

        // Move Tetris Piece left and right until there is a collision
        while(checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {

            // Add the offset to the x-coordinate
            clonedPlayer.pos.x += offset;

            // Increase and reverse Offset
            offset = -(offset + (offset > 0 ? 1 : -1));

            // Check if the Offset is greater than size of Tetris Piece
            if (offset > clonedPlayer.tetromino[0].length) {

                // Rotate the Piece back
                rotate(clonedPlayer.tetromino, -dir);
                
                // Reset the x-coordinate
                clonedPlayer.pos.x = pos;
                return;
            }
        }

        // Update the Player in state
        setPlayer(clonedPlayer);
    };



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


    return [player, updatePlayerPos, resetPlayer, playerRotate];
};