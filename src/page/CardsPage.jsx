import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { HomelLayout } from '../components/HomelLayout';
import { apiUrl } from '../constants/Apiurl';

export const CardsPage = () => {
    const [gameData, setGameData] = useState([]);
    // const [cards, setCards] = useState([]);
    const [laoding, setLaoding] = useState(true);
    // const [currentCardIndex, setCurrentCardIndex] = useState(0);

    const getGameData = async () => {
        try {
            const response = await fetch(`${ apiUrl }/api/flash-cards`);
            const data = await response.json();
            console.log(data);
            setGameData(data.games);
            setLaoding(false);
        } catch (error) {
            console.error('Error:', error);
            setLaoding(false);
        }
    }

    // const createGame = async () => {
    //     try {
    //         const response = await fetch(`${ apiUrl }/api/flash-cards`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 title: 'Game 1',
    //                 description: 'Game 1 description'
    //             })
    //         });
    //         const data = await response.json();
    //         console.log(data);
    //         // setGameData([...gameData, data]);
    //         getGameData();
    //     } catch (error) {
    //         console.error('Error:', error
    //         );
    //     }
    // }


    useEffect(() => {
        getGameData();
    }, []);

    return (
        <HomelLayout>
            <div
                className='flex flex-col items-center w-full'
            >
                <h1
                    className='text-3xl text-white'
                >Flash Cards</h1>
                {/* <button
                    onClick={createGame}
                    style={{
                        padding: '10px',
                        margin: '10px',
                        backgroundColor: '#414646',
                        color: 'white'
                    }}
                >Create Game</button> */}

                {
                    laoding
                        ? <p>Loading...</p>
                        : <>
                            <h2
                                style={{
                                    color: '#ffffff',
                                    borderBottom: '2px solid #ffffff',
                                }}
                            >Lista de Juegos</h2>
                            <div
                                // style={{
                                //     display: 'grid',
                                //     gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                                //     gap: '10px',
                                // }}
                                className='w-full gap-10 grid grid-cols-1 md:grid-cols-2 max-w-4xl  pt-4'
                            >
                                {
                                    gameData.map((game, index) => (
                                        <div
                                            key={index}
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '10px',
                                                padding: '10px',
                                                borderRadius: '10px',
                                                background: '#1a49d8',
                                            }}
                                        >
                                            <h2>{game.title}</h2>
                                            <p>{game.description}</p>
                                            {/* <button onClick={() => getCards(game._id)}>Start Game</button> */}
                                            <Link to={`/game/${ game._id }`}
                                                style={{
                                                    padding: '10px',
                                                    backgroundColor: '#414646',
                                                    color: 'white',
                                                    textAlign: 'center',
                                                    borderRadius: '10px',
                                                }}
                                            >Start Game</Link>
                                        </div>
                                    ))
                                }
                            </div>
                        </>
                }
            </div>
            {/* <GamePage game={gameData} /> */}
        </HomelLayout>
    )
}
