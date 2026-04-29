import { createBrowserRouter } from "react-router-dom"

import App from "../app/App"
import HomePage from "../pages/HomePage"
import AboutUsPage from "../pages/AboutUsPage"
import HowBuyPage from "../pages/HowBuyPage"
import SalePage from "../pages/SalePage"

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
        element: <SalePage />,
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
        element: <AboutUsPage />,
      },
      {
        path: "/how-to-buy/:section?",
        element: <HowBuyPage />,
      },
      {
        path: "*",
        //element: <NotFoundPage />,
      },
    ],
  },
])