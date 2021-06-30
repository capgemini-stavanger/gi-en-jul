import React, { FC } from 'react';

interface Props {
    prop1: string,
}

const Circle:FC<Props> = (props) => {
    return (
        <svg height="20" width="20">
            <circle cx="10" cy="10" r="10" fill={props.prop1} />
        </svg>
    );
}

export default Circle;