import React from 'react';

import Cell from './Cell';
import { StyledStage } from './styles/StyledStage';



const Stage = ({ stage }) => (

    // Pass the width and height of the Stage to the Styled Stage to calculate Grid templates
    <StyledStage width={stage[0].length} height={stage.length}>

        {/* Map through each column and row on the Stage to render each individual Cell */}
        {stage.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
    </StyledStage>
);



export default Stage;
