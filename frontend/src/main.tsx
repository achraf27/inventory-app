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
import ProtectedLayout from './utils/protectedLayout'
import PublicRoutes from './utils/publicRoutes'
import AdminRoutes from './utils/adminRoutes'
import AdminUsers from './pages/admin.users'
import AdminSuppliers from './pages/admin.suppliers'
import AdminUserForm from './pages/admin.users.form'
import AdminSupplierForm from './pages/admin.supplier.form'
import Settings from './pages/settings'
import AdminArticles from './pages/admin.articles'
import AdminArticleForm from './pages/admin.article.form'
import { AuthProvider } from './context/authContext'


const router = createBrowserRouter([
  {
    element: <ProtectedRoutes />, // auth
    children: [
      {
        element: <ProtectedLayout />, // layout
        children: [
          { path: "/dashboard", element: <Dashboard /> },
          { path: "/inventory", element: <Inventory /> },
          { path: "/catalog", element: <Catalog /> },
          { path: "/settings", element: <Settings /> },
        ],
      },
    ],
  },

  {
    element: <AdminRoutes />,
    children: [
      { element: <ProtectedLayout />, // layout
        children: [


      { path: "/admin/users", element: <AdminUsers /> },
      { path: "/admin/users/create", element: <AdminUserForm /> },
      { path: "/admin/users/:user_id/edit", element: <AdminUserForm /> },
      { path: "/admin/suppliers", element: <AdminSuppliers /> },
      { path: "/admin/suppliers/create", element: <AdminSupplierForm /> },
      { path: "/admin/suppliers/:supplier_id/edit", element: <AdminSupplierForm /> },
      { path: "/admin/articles", element: <AdminArticles /> },
      { path: "/admin/articles/create", element: <AdminArticleForm /> },
      { path: "/admin/articles/:article_id/edit", element: <AdminArticleForm /> },
        ],
      },
    ],
  },

  {
    element: <PublicRoutes />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/", element: <Home /> },
    ],
  },

  { path: "*", element: <NotFound /> },
]);

  
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={router}/>
    </AuthProvider>
  </StrictMode>,
)
