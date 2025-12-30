import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Inventory from './pages/inventory'
import NotFound from './pages/notFound'
import Login from './pages/login'
import Catalog from './pages/catalog'
import Register from './pages/register'
import Dashboard from './pages/dashboard'
import Home from './pages/home'
import ProtectedRoutes from './utils/protectedRoutes'
import PublicRoutes from './utils/publicRoutes'

const router = createBrowserRouter([
  {element: <ProtectedRoutes/>,
    children:[
        {path:"/dashboard",element:<Dashboard/>},
        {path:"/inventory",element:<Inventory/>},
        {path:"/catalog",element:<Catalog/>}, 
    ]
  },
 
   {element: <PublicRoutes/>,
    children:[
  {path:"/login",element:<Login/>},
  {path:"/register",element:<Register/>},
  {path:"/",element:<Home/>},
    ]
  },
  {path:"*",element:<NotFound/>}
  
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
