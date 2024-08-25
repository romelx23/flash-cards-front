import React from 'react';

const GameIntro = ({ title, introduction }) => (
    <div style={{
        padding: '10px',
        margin: '10px 0'
    }}>
        <h1 style={{
            fontSize: '1.5rem',
        }}>{title}</h1>
        <p>{introduction}</p>
    </div>
);

export default GameIntro;