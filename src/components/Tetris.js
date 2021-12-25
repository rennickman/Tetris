import React, { useState } from 'react';

import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';
import { checkCollision, createStage } from '../gameHelpers';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';




const Tetris = () => {

    // DropTime is the speed which the Tetris Pieces fall
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);	

    // Use Customer Hooks to get Player and Stage
    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage] = useStage(player, resetPlayer);


    // Log any Re-Renders
    console.log("re-render");


    // Method to move the Player by changin the X-coordinate
    const movePlayer = dir => {

        // Check that there are no collisions
        if (!checkCollision(player, stage, { x: dir, y: 0})) {

            // Update the Player X-Coordinate
            updatePlayerPos({ x: dir, y: 0 });
        }
    };


    // Method for starting the game
    const startGame = () => {

        // Reset everything
        setStage(createStage());
        resetPlayer();
        setGameOver(false);
    };


    // Method to Drop the player by changing the Y-coordinate
    const drop = () => {

        // Check that there are no collisions
        if (!checkCollision(player, stage, { x: 0, y: 1 })) {

            // Update the Player Y-Coordinate
            updatePlayerPos({ x: 0, y: 1, collided: false });

        } else {

            // Check for Game Over
            if (player.pos.y < 1) {
                console.log("GAME OVER!!!");

                // Set Value of GameOver
                setGameOver(true);
                // Stop Pieces from dropping
                setDropTime(null);
            }

            // Set Collided to true if there is a collision
            updatePlayerPos({ x: 0, y: 0, collided: true });
        }
    };


    // Method to drop the Player
    const dropPlayer = () => {

        // Call the drop Method
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

            // Check if KeyCode is Up Arrow 
            } else if (keyCode === 38) {
                playerRotate(stage, 1);
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
