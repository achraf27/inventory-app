import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import Stocks from './components/stocks/stocks.tsx'
import NotFound from './components/NotFound/NotFound.tsx'
import Login from './components/login/login.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {path:"/",element:<App/>},
  {path:"/stocks",element:<Stocks/>},
  {path:"/login",element:<Login/>},
  {path:"*",element:<NotFound/>}
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
