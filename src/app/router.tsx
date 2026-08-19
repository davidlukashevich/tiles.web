import { createBrowserRouter } from "react-router-dom"

import App from "../app/App"
import AboutUsPage from "../pages/AboutUsPage"
import CatalogPage from "../pages/CatalogPage"
import HomePage from "../pages/HomePage"
import HowBuyPage from "../pages/HowBuyPage"
import PrivacyPage from "../pages/PrivacyPage"
import ProductPage from "../pages/ProductPage"
import TermsPage from "../pages/TermsPage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      // {
      //   path: "catalog/sale",
      //   element: <SalePage />,
      // },
      {
        path: "catalog/:type?/:section?",
        element: <CatalogPage />,
      },
      {
        path: "product/:id",
        element: <ProductPage />,
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
        path: "privacy",
        element: <PrivacyPage />,
      },
      {
        path: "terms",
        element: <TermsPage />,
      },
      {
        path: "*",
        //element: <NotFoundPage />,
      },
    ],
  },
])