import { createBrowserRouter } from "react-router-dom"

import App from "../app/App"
import HomePage from "../pages/HomePage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "sale",
        //element: <SalePage />,
      },
      {
        path: "catalog",
        //element: <CatalogPage />,
      },
      {
        path: "product/:id",
       // element: <ProductPage />,
      },
      {
        path: "about",
        //element: <AboutPage />,
      },
      {
        path: "*",
        //element: <NotFoundPage />,
      },
    ],
  },
])