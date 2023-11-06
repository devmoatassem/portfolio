import Intro from "./Intro";
import Skills from "./Skills";
import "../../assets/css/main-bg.css"
import { motion } from "framer-motion";
import { pageVariants } from "../common/animationVarients";

function About() {
    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="relative z-20 bg-[#0b1224]">
            <section className="relative">
                <div className="main-bg absolute left-0 top-0 h-full w-full"></div>
                <div className="max-w-screen-xl container  mx-auto">
                    <div className="flex min-h-screen w-full items-center justify-center">
                        <Intro />
                    </div>
                </div>
            </section>
            <hr className="md:mx-auto border-gray-700" />
            <section className="relative">
                {/* <div className="absolute left-0 top-0 h-full w-full"></div> */}
                <div className="max-w-screen-xl container  mx-auto">
                    <div className="flex w-full items-center justify-center">
                        <Skills />
                    </div>
                </div>
            </section>
        </motion.div>
    )
}

export default About;    