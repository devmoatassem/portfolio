import HeaderC from "../common/HeaderC";
import Projects from "./Projects";
import { motion } from "framer-motion";
import { pageVariants } from "../common/animationVarients";

function Portfolio(props) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
      className="relative z-20 bg-[#0b1224] ">
      <HeaderC heading='Projects' description="Passionate about diverse projects, many open-source. Join me, explore, and enhance. Your input fuels progress, and I welcome fresh ideas. Let's innovate together." topPadding={props.topPadding} tran={props.tran} />
      <Projects />
    </motion.div>
  );
}

export default Portfolio;