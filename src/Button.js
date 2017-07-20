import React from 'react';

const Button = (props) => (
    <div>
        <button disabled={!props.active} onClick={props.onClick}>{props.title}</button>
    </div>   
);

export {Button};