import About from "../about/About"
import Portfolio from "../portfolio/Portfolio"
import Education from "../education/Education";
import { motion } from "framer-motion";
import { pageVariants } from "../common/animationVarients";

function Home() {
    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}>
            <About />
            <Portfolio topPadding="mt-0" tran='0.2' />
            <Education topPadding="mt-0" tran='0.2' />
        </motion.div>
    )
}

export default Home;