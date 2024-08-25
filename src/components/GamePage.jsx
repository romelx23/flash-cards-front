import { useState } from 'react';
import GameIntro from '../components/GameIntro';
import GameSynopsis from '../components/GameSynopsis';
import Scene from '../components/Scene';

const GamePage = ({ game }) => {
    const [currentSceneId, setCurrentSceneId] = useState(1);

    // Encuentra el escenario actual basado en el ID
    const currentScenario = game.scenarios.find(scene => scene.sceneId === currentSceneId);

    const handleOptionSelect = (nextSceneId) => {
        setCurrentSceneId(nextSceneId);
    };

    const handleActionSelect = (nextSceneId) => {
        setCurrentSceneId(nextSceneId);
    };

    return (
        <div>
            <GameIntro title={game.gameTitle} introduction={game.introduction} />
            <GameSynopsis synopsis={game.storySynopsis} />
            {currentScenario ? (
                <Scene
                    scenario={currentScenario}
                    onOptionSelect={handleOptionSelect}
                    onActionSelect={handleActionSelect}
                />
            ) : (
                <p>Escenario no encontrado.</p>
            )}
        </div>
    );
};

export default GamePage;