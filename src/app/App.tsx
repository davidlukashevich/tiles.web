import { Outlet } from "react-router-dom"
import Layout from "../components/ui/layout/Layout"
import ScrollToTop from "../helpers/ScrollToTop"
import { useMetrikaPageViews } from "../hooks/useMetrikaPageViews"

function App() {
  useMetrikaPageViews()

  return (
    <Layout>
      <ScrollToTop />
      <Outlet />
    </Layout>
  )
}

export default App
