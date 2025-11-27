import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Stocks from './pages/stocks'
import NotFound from './pages/notFound'
import Login from './pages/login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Register from './pages/register'
import Dashboard from './pages/dashboard'
import UpdateArticle from './pages/updateArticle'
import ProtectedRoutes from './utils/protectedRoutes'

const router = createBrowserRouter([
  {element: <ProtectedRoutes/>,
    children:[
        {path:"/dashboard",element:<Dashboard/>},
        {path:"/stocks",element:<Stocks/>},
        {path:"/stocks/:id/edit",element:<UpdateArticle/>},
    ]
  },
 
  {path:"/login",element:<Login/>},
  {path:"/register",element:<Register/>},
  {path:"*",element:<NotFound/>}
  
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
