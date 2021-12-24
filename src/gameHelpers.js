
// Width and Height of Stage display
export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;



// Method for creating a new empty Stage
export const createStage = () => (
    
    // Create a nested Array where an Array of Columns is filled with an array of Cells representing each row
    Array.from(Array(STAGE_HEIGHT), () => new Array(STAGE_WIDTH).fill([0, "clear"]))
);