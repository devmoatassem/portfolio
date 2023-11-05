import HeaderC from "../common/HeaderC";
import University from "./University";
import Certificates from "./Certificates";
import { motion } from "framer-motion";
import { pageVariants } from "../common/animationVarients";

function Education(props) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
      className="relative z-20 bg-[#0b1224] ">
      <HeaderC heading='Education & Certifications' description="Passionate about diverse projects, many open-source. Join me, explore, and enhance. Your input fuels progress, and I welcome fresh ideas. Let's innovate together." topPadding={props.topPadding} tran={props.tran} />
      <University />
      <Certificates />
    </motion.div>
  );
}

export default Education;
