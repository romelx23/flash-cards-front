import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

// Import your components here
import { CardsPage } from '../page/CardsPage';
import { GameRpg } from '../page/GameRpg';
import { GuessCard } from '../page/GuessCard';

export const routes = createBrowserRouter(createRoutesFromElements(
    <Route path='/'>
        <Route index element={<CardsPage />} />
        <Route path="/game-rpg" element={<GameRpg />} />
        <Route path="/game/:id" element={<GuessCard />} />
        <Route path="*" element={<h1>No se encontró</h1>} />
    </Route>
));