import { useState, useEffect } from 'react';

import { createStage } from '../gameHelpers';




// Custom hook for returning Stage
export const useStage = (player, resetPlayer) => {

    // Set the initial state of Stage
    const [stage, setStage] = useState(createStage());
    const [rowsCleared, setRowsCleared] = useState(0); 


    // Use Effect for updating the Stage whenever player moves, resets or there is a collision
    useEffect(() => {

        // Reset the number of rows cleared
        setRowsCleared(0);

        // Method to clear completed rows
        const sweepRows = newStage => (

            // Map through every row of stage
            newStage.reduce((acc, row) => {

                // Check if an empty cell can be found in the row
                if (row.findIndex(cell => cell[0] === 0) === -1) {

                    // Add one to number of rows to clear
                    setRowsCleared(prev => prev + 1);

                    // Add an empty row of cells to top of the new array
                    acc.unshift(new Array(newStage[0].length).fill([0, "clear"]));

                    // Return the accumulator
                    return acc;
                }

                // If row doesn't need to be cleared - add back into new Array
                acc.push(row);
                return acc;
            }, [])
        );


        // Method for Updating the Stage
        const updateStage = prevStage => {

            // Flush the Stage - Map through each Cell and clear it if no collision
            const newStage = prevStage.map(row => row.map(cell => (cell[1] === "clear" ? [0, "clear"] : cell)));

            // Draw the Tetris Piece - Loop through every row on The Tetris Piece
            player.tetromino.forEach((row, y) => {

                // Loop through every Cell in the row
                row.forEach((value, x) => {
                    
                    // Check for Tetris Pieces
                    if (value !== 0) {

                        // Check for a collision and set value to merged if there is one - so it won't be flushed
                        newStage[y + player.pos.y][x + player.pos.x] = [value, `${player.collided ? 'merged' : 'clear'}`];
                    }
                });
            });

            // Check for collisions
            if (player.collided) {

                // Reset the Player
                resetPlayer();

                // Check for any rows to be cleared
                return sweepRows(newStage);
            }

            return newStage;
        };


        // Update the Stage in state
        setStage(prev => updateStage(prev));

    }, [player, resetPlayer]);


    return [stage, setStage, rowsCleared];
};