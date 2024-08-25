import { useEffect, useState } from 'react'
import GamePage from '../components/GamePage';
import { HomelLayout } from '../components/HomelLayout';
import { apiUrl } from '../constants/Apiurl';

export const GameRpg = () => {
    const [gameData, setGameData] = useState(0);
    const [laoding, setLaoding] = useState(true);

    const getGameData = async () => {
        try {
            const response = await fetch(`${ apiUrl }/api/ai-history`);
            const data = await response.json();
            console.log(data);
            setGameData(data.histories[0]);
            setLaoding(false);
        } catch (error) {
            console.error('Error:', error);
            setLaoding(false);
        }
    }

    useEffect(() => {
        getGameData();
    }, []);

    return (
        <HomelLayout>
            <h1>AI History</h1>
            {
                laoding
                    ? <p>Loading...</p>
                    : <GamePage game={gameData} />
            }
            {/* <GamePage game={gameData} /> */}
        </HomelLayout>
    )
}
