import React, { useState } from 'react';

import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';
import { createStage } from '../gameHelpers';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';




const Tetris = () => {

    // DropTime is the speed which the Tetris Pieces fall
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);	

    // Use Customer Hooks to get Player and Stage
    const [player, updatePlayerPos, resetPlayer] = usePlayer();
    const [stage, setStage] = useStage(player);


    // Log any Re-Renders
    console.log("re-render");


    // Method to move the Player by changin the X-coordinate
    const movePlayer = dir => {

        // Update the Player X-Coordinate
        updatePlayerPos({ x: dir, y: 0 });
    };


    // Method for starting the game
    const startGame = () => {

        // Reset everything
        setStage(createStage());
        resetPlayer();
    };


    // Method to Drop the player by changing the Y-coordinate
    const drop = () => {

        // Update the Player Y-Coordinate
        updatePlayerPos({ x: 0, y: 1, collided: false });
    };


    // Method to drop the Player
    const dropPlayer = () => {

        drop();
    };


    // Method to handle Moving Player based on which KeyCode is attached to event
    const move = ({ keyCode }) => {

        // Check game is not in GameOver state
        if (!gameOver) {

            // Check if KeyCode is Left Arrow
            if (keyCode === 37) {
                movePlayer(-1);

            // Check if KeyCode is Right Arrow
            } else if (keyCode === 39) {
                movePlayer(1);

            // Check if KeyCode is Down Arrow 
            } else if (keyCode === 40) {
                dropPlayer();
            }
        }
    };



    return (
        <StyledTetrisWrapper role="button" tabIndex={"0"} onKeyDown={e => move(e)} >
            <StyledTetris>

                {/* Stage */}
                <Stage stage={stage} />

                {/* Sidebar Section - Display Game Over screen or Info Section depending on Game Over state */}
                <aside>
                    {gameOver ? (
                        <Display gameOver={gameOver} text="Game Over" />
                    ) : (
                        <div>
                            <Display text="Score" />
                            <Display text="Rows" />
                            <Display text="Level" />
                        </div>
                    )}

                    {/* Start Button */}
                    <StartButton callback={startGame} />
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
};



export default Tetris;
