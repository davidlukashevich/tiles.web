import FooterContainer from "../../containers/layout/FooterContainer"
import HeaderContainer from "../../containers/layout/HeaderContainer"
import Container from "./Container"

type Props = {
    children: React.ReactNode
}

const Layout = ({children}: Props) => {
    return (
        <div>
            <HeaderContainer />
            <Container>
                {children}
            </Container>
            <FooterContainer />
        </div>
    )
}

export default Layout