import Intro from "./Intro";
import Scroll from "./Scroll";
import "../../assets/css/main-bg.css"
function Home(){
    return(
        <div className="relative z-20 bg-[#0b1224]  ">
            <div className="main-bg absolute left-0 top-0 h-full w-full"></div>
            <section className="max-w-screen-xl container relative mx-auto">
            <div className="flex min-h-screen w-full items-center justify-center">
                <Intro />
                <Scroll />
            </div>
            
        </section>
        </div>
        
        
    )

}

export default Home;    