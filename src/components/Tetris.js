import React from 'react';

import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';
import { createStage } from '../gameHelpers';
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';





const Tetris = () => {


    return (
        <StyledTetrisWrapper>
            <StyledTetris>

                {/* Create a new Stage and pass it as a prop to the Stage component */}
                <Stage stage={createStage()} />

                {/* Side Bar Section */}
                <aside>
                    <div>
                        <Display text="Score" />
                        <Display text="Rows" />
                        <Display text="Level" />
                    </div>

                    <StartButton />
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
};



export default Tetris;
