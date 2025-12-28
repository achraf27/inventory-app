import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Inventory from './pages/inventory'
import NotFound from './pages/notFound'
import Login from './pages/login'
import Catalog from './pages/catalog'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Register from './pages/register'
import Dashboard from './pages/dashboard'
import ProtectedRoutes from './utils/protectedRoutes'

const router = createBrowserRouter([
  {element: <ProtectedRoutes/>,
    children:[
        {path:"/dashboard",element:<Dashboard/>},
        {path:"/inventory",element:<Inventory/>},
        {path:"/catalog",element:<Catalog/>}, 
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
