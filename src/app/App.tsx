import { Outlet } from "react-router-dom"
import Layout from "../components/ui/layout/Layout"
import ScrollToTop from "../helpers/ScrollToTop"

function App() {
  return (
    <Layout>
      <ScrollToTop />
      <Outlet />
    </Layout>
  )
}

export default App
