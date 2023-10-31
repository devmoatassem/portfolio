import About from "../about/About"
import Portfolio from "../portfolio/Portfolio"
function Home(){
    return(
        <>
        <About />
        <Portfolio topPadding = "mt-0" />
        </>
    )
}
export default Home;