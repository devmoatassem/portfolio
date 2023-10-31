import About from "../about/About"
import Portfolio from "../portfolio/Portfolio"
import Education from "../education/Education";
function Home(){
    return(
        <>
        <About />
        <Portfolio topPadding = "mt-0" />
        <Education topPadding = "mt-0" />

        </>
    )
}
export default Home;