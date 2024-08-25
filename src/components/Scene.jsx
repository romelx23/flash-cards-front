import React from 'react';

const Scene = ({ scenario, onOptionSelect, onActionSelect }) => (
    <div>
        <h2>{scenario.location}</h2>
        <p>{scenario.description}</p>

        <div

            style={{
                display: "flex",
                justifyContent: "space-between",
            }}
        >
            {scenario.characters.map((character, index) => (
                <div
                    key={index}
                >
                    <h3>{character.name}</h3>
                    <img src={character.image_url} alt={character.name} />
                    {character.dialogue.map((dialogue, idx) => (
                        <div key={idx}>
                            <p>{dialogue.text}</p>
                            {dialogue.options.map(option => (
                                <button
                                    key={option.optionId}
                                    onClick={() => onOptionSelect(option.nextSceneId)}
                                >
                                    {option.text}
                                </button>
                            ))}
                        </div>
                    ))}
                </div>
            ))}
        </div>

        <h3>Acciones disponibles</h3>
        {scenario.actions.map(action => (
            <button
                key={action.actionId}
                onClick={() => onActionSelect(action.nextSceneId)}
            >
                {action.description}
            </button>
        ))}
    </div>
);

export default Scene;