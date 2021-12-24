
// Width and Height of Stage display
export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;



// Method for creating a new empty Stage
export const createStage = () => (
    
    // Create a nested Array where an Array of Columns is filled with an array of Cells representing each row
    Array.from(Array(STAGE_HEIGHT), () => new Array(STAGE_WIDTH).fill([0, "clear"]))
);




// Method to check for collisions
export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {

    // Loop through all the rows
    for (let y = 0; y < player.tetromino.length; y += 1) {
        // Loop through all the cells on each row
        for (let x = 0; x < player.tetromino[y].length; x += 1) {

            // Check that the Cell is an actual Tetris piece cell - value is set to a Tetromino value
            if (player.tetromino[y][x] !== 0) {
                if (
                    // Check move is inside the game area height (y) and can't go through bottom of Stage
                    !stage[y + player.pos.y + moveY] || 

                    // Check move is inside the game area width (x)
                    !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||

                    // Check cell we are moving to isnt set to clear
                    stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== "clear"

                ) {
                    // Return True if all tests passed
                    return true;
                }
            }
        }
    }
};