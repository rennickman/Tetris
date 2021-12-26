import { useState, useEffect, useCallback } from 'react';


export const useGameStatus = rowsCleared => {

    const [score, setScore] = useState(0);
    const [rows, setRows] = useState(0);
    const [level, setLevel] = useState(0);

    // Scores per number of Line Clears
    const linePoints = [40, 100, 300, 1200];


    // Method to Caluclate the score
    const calcScore = useCallback(() => {

        // Check some rows have been cleared
        if (rowsCleared > 0) {

            // Forumula to calculate score - based on Orginal Tetris scoring
            setScore(prev => prev + linePoints[rowsCleared - 1] * (level + 1));

            // Update total number of rows cleared
            setRows(prev => prev + rowsCleared);
        }
    }, [level, linePoints, rowsCleared]);


    
    // Use Effect to call the Calculate Score method
    useEffect(() => {

        calcScore();

    }, [calcScore, rowsCleared, score]);


    return [score, setScore, rows, setRows, level, setLevel];
};