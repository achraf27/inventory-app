import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Inventory from './pages/inventory'
import NotFound from './pages/not.found'
import Login from './pages/login'
import Catalog from './pages/catalog'
import Register from './pages/register'
import Dashboard from './pages/dashboard'
import Home from './pages/home'
import ProtectedRoutes from './utils/protectedRoutes'
import PublicRoutes from './utils/publicRoutes'
import AdminRoutes from './utils/adminRoutes'
import AdminUsers from './pages/admin.users'
import AdminSuppliers from './pages/admin.suppliers'
import AdminUserForm from './pages/admin.users.form'
import AdminSupplierForm from './pages/admin.supplier.form'

const router = createBrowserRouter([
  {element: <ProtectedRoutes/>,
    children:[
        {path:"/dashboard",element:<Dashboard/>},
        {path:"/inventory",element:<Inventory/>},
        {path:"/catalog",element:<Catalog/>}, 
    ]
  },
  
  {
    element: <AdminRoutes />,
    children: [
      { path: "/admin/users", element: <AdminUsers /> },
      { path: "/admin/users/create", element: <AdminUserForm /> },
      { path: "/admin/users/:user_id/edit", element: <AdminUserForm /> },
      { path: "/admin/suppliers", element: <AdminSuppliers /> },
      { path: "/admin/suppliers/create", element: <AdminSupplierForm /> },
      { path: "/admin/suppliers/:supplier_id/edit", element: <AdminSupplierForm /> },
    ],
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
