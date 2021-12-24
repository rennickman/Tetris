import React from 'react';

import { StyledCell } from './styles/StyledCell';
import { TETROMINOS } from '../tetrominos';



const Cell = ({ type }) => (

    // Render Styled Cell using Type and Colour passed down from the Stage
    <StyledCell type={type} color={TETROMINOS[type].color} />
);




export default Cell;
