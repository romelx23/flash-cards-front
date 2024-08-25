import { useState } from 'react';

const GameSynopsis = ({ synopsis }) => {

    const [show, setShow] = useState(false);

    return (
        <>
            <button
                onClick={() => setShow(!show)}
                style={{
                    padding: '5px 10px',
                    backgroundColor: '#262626',
                    border: '1px solid #ccc',
                    cursor: 'pointer',
                }}
            >mostrar</button>
            {
                show && (
                    <div
                        style={{
                            padding: '10px',
                            margin: '10px 0',
                            border: '1px solid #ccc',
                        }}
                    >
                        <h2>Story Synopsis</h2>
                        <p>{synopsis}</p>
                    </div>
                )
            }
        </>
    )
};

export default GameSynopsis;