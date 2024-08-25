import { RouterProvider } from 'react-router-dom';
import './App.css'
import { routes } from './router/routes';
import { Toaster } from 'sonner';

function App() {

  return (
    <>
      <Toaster richColors />
      <RouterProvider router={routes} />
    </>
  )
}

export default App
