import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { HomelLayout } from "../components/HomelLayout";
import { toast } from "sonner";
import { useHotkeys } from "react-hotkeys-hook";
import { apiUrl } from "../constants/Apiurl";

export const GuessCard = () => {

    const params = useParams();
    const [cards, setCards] = useState([]);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [laoding, setLaoding] = useState(true);
    const [recognizedText, setRecognizedText] = useState('');
    const [isSpeech, setIsSpeech] = useState(false);
    const recognitionRef = useRef(null);


    const speakText = (text, lang = 'en-US') => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = lang;
            utterance.rate = 1;
            utterance.pitch = 1;
            utterance.volume = .5;
            window.speechSynthesis.speak(utterance);
        } else {
            console.error('Tu navegador no soporta la síntesis de voz.');
        }
    };

    const getCards = async (id) => {
        try {
            const response = await fetch(`${ apiUrl }/api/flash-cards/${ id }`);
            const data = await response.json();
            console.log(data);
            setCards(data.cards);
            setLaoding(false);
        } catch (error) {
            console.error('Error:', error);
            setLaoding(false);
        }
    }

    const handleSpeechRecognition = () => {
        setIsSpeech(true);
        const recognition = new window.webkitSpeechRecognition();
        recognition.lang = 'en-US';
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = (event) => {
            const transcript = Array.from(event.results)
                .map((result) => result[0])
                .map((result) => result.transcript)
                .join('');

            setRecognizedText(transcript);
            console.log(transcript);

            if (transcript.toLowerCase().trim().includes(cards[currentCardIndex].word.toLowerCase().trim())) {
                toast.success('Correcto');
            } else {
                toast.error('Incorrecto');
            }
        };


        recognitionRef.current = recognition;

        recognition.onerror = (event) => {
            console.error('Error en reconocimiento de voz:', event.error);
        };

        recognition.onspeechend = () => {
            // Se detiene el reconocimiento de voz cuando la persona deja de hablar
            recognition.stop();
            console.log('Reconocimiento de voz detenido porque la persona dejó de hablar.');
        };

        recognition.onend = () => {
            setIsSpeech(false);
        }

        recognition.start();
    }

    const handleSpeechRecognitionStop = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
    };

    useEffect(() => {
        getCards(params.id);
    }, [])

    useHotkeys('left', () => {
        setCurrentCardIndex((prevIndex) =>
            prevIndex === 0 ? cards.length - 1 : prevIndex - 1
        );
    });

    useHotkeys('right', () => {
        setCurrentCardIndex((prevIndex) =>
            prevIndex === cards.length - 1 ? 0 : prevIndex + 1
        );
    });

    // useEffect(() => {
    //   if (cards.length > 0) {
    //     const interval = setInterval(() => {
    //       setCurrentCardIndex((prevIndex) =>
    //         prevIndex === cards.length - 1 ? 0 : prevIndex + 1
    //       );
    //     }, 5000); // Cambia de carta cada 5 segundos

    //     return () => clearInterval(interval); // Limpiar el intervalo al desmontar
    //   }
    // }, [cards]);


    return (

        <HomelLayout>

            {
                laoding && <p>Loading...</p>
            }

            {cards.length > 0 && (
                <div
                    className="flex flex-col items-center"
                >
                    <span>
                        {currentCardIndex + 1} / {cards.length}
                    </span>
                    <div
                        key={currentCardIndex}
                        style={{
                            border: '4px solid #1f12ae',
                            margin: '10px',
                            width: '350px',
                            height: '450px',
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '20px',
                            // justifyContent: 'center',
                            // alignItems: 'center',
                            background: '#5040cd',
                            borderRadius: '10px',
                            gap: '15px',
                        }}
                    // className="flex flex-col gap-3 items-center justify-center w-96 h-96 bg-blue-500 rounded-lg p-4 shadow-lg text-white text-center"
                    >

                        <h2
                            className="text-2xl text-white"
                        >
                            Adivina la palabra
                        </h2>

                        <div
                            className="flex justify-between gap-3 items-start"
                        >
                            <h3 className="text-xl">{cards[currentCardIndex].word}</h3>
                            <button
                                onClick={() => speakText(cards[currentCardIndex].word)}
                                style={{
                                    padding: '10px',
                                    backgroundColor: '#414646',
                                    color: 'white'
                                }}
                                className="flex gap-2"
                            >
                                Speak
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-speakerphone"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 8a3 3 0 0 1 0 6" /><path d="M10 8v11a1 1 0 0 1 -1 1h-1a1 1 0 0 1 -1 -1v-5" /><path d="M12 8h0l4.524 -3.77a.9 .9 0 0 1 1.476 .692v12.156a.9 .9 0 0 1 -1.476 .692l-4.524 -3.77h-8a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h8" /></svg>
                            </button>
                        </div>

                        <div
                            className="flex justify-between gap-3 items-start"
                        >
                            <p className="text-xl text-start">{cards[currentCardIndex].example}</p>
                            <button
                                onClick={() => speakText(cards[currentCardIndex].example)}
                                style={{
                                    padding: '10px',
                                    backgroundColor: '#414646',
                                    color: 'white'
                                }}
                                className="flex gap-2"
                            >
                                Speak
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-speakerphone"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 8a3 3 0 0 1 0 6" /><path d="M10 8v11a1 1 0 0 1 -1 1h-1a1 1 0 0 1 -1 -1v-5" /><path d="M12 8h0l4.524 -3.77a.9 .9 0 0 1 1.476 .692v12.156a.9 .9 0 0 1 -1.476 .692l-4.524 -3.77h-8a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h8" /></svg>
                            </button>
                        </div>

                        <div className="w-full flex flex-col">
                            <div
                                className="flex justify-between gap-2"
                            >
                                <div className="flex flex-col">
                                    <h2>
                                        Definición
                                    </h2>

                                    <p
                                        style={{
                                            fontSize: '18px',
                                            cursor: 'pointer',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {cards[currentCardIndex].definition}
                                    </p>
                                </div>
                                <button
                                    onClick={() => speakText(cards[currentCardIndex].definition, 'es-AR')}
                                    style={{
                                        padding: '10px',
                                        backgroundColor: '#414646',
                                        color: 'white'
                                    }}
                                    className="flex gap-2"
                                >
                                    Speak
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-speakerphone"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 8a3 3 0 0 1 0 6" /><path d="M10 8v11a1 1 0 0 1 -1 1h-1a1 1 0 0 1 -1 -1v-5" /><path d="M12 8h0l4.524 -3.77a.9 .9 0 0 1 1.476 .692v12.156a.9 .9 0 0 1 -1.476 .692l-4.524 -3.77h-8a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h8" /></svg>
                                </button>
                            </div>
                            <div className="flex flex-col gap-2 mt-2 py-1 px-3 border border-dotted rounded-lg">
                                <h2 className="text-start font-semibold">
                                    Pronunciación
                                </h2>
                                <button
                                    onClick={handleSpeechRecognition}
                                    className="bg-blue-500 text-white p-2 rounded-lg flex gap-2 justify-center"
                                >
                                    Hablar
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-ear"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6 10a7 7 0 1 1 13 3.6a10 10 0 0 1 -2 2a8 8 0 0 0 -2 3a4.5 4.5 0 0 1 -6.8 1.4" /><path d="M10 10a3 3 0 1 1 5 2.2" /></svg>
                                </button>
                                {/* btn parar */}
                                <button
                                    onClick={handleSpeechRecognitionStop}
                                    className="bg-red-500 text-white p-2 rounded-lg flex gap-2 justify-center"
                                >
                                    Parar
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-player-pause"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" /><path d="M14 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" /></svg>
                                </button>
                                {
                                    isSpeech && <p>Escuchando...</p>
                                }
                                <p
                                    className="text-start text-wrap "
                                >Texto reconocido: {recognizedText}</p>
                            </div>
                        </div>


                    </div>
                </div>
            )}

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px'
                }}
            >
                <button
                    onClick={() => setCurrentCardIndex((prevIndex) =>
                        prevIndex === 0 ? cards.length - 1 : prevIndex - 1
                    )}
                    style={{
                        padding: '10px',
                        margin: '10px',
                        width: '100px',
                        backgroundColor: '#414646',
                        color: 'white'
                    }}
                >
                    Previous
                </button>
                <button
                    onClick={() => setCurrentCardIndex((prevIndex) =>
                        prevIndex === cards.length - 1 ? 0 : prevIndex + 1
                    )}
                    style={{
                        padding: '10px',
                        margin: '10px',
                        width: '100px',
                        backgroundColor: '#414646',
                        color: 'white'
                    }}
                >
                    Next
                </button>

            </div>
        </HomelLayout>
    )
}
