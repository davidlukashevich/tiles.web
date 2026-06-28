import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import '../styles/main.css'
import { QueryProvider } from './providers/QueryProvider.tsx'
import { router } from './router.tsx'

createRoot(document.getElementById('root')!).render(
    <QueryProvider>
        <RouterProvider router={router} />
    </QueryProvider>
)