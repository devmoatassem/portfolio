import { motion } from "framer-motion";
import { childVariants } from "../common/animationVarients";

function Scroll() {
  const scrollDown = () => {
    const screenHeight = window.innerHeight;
    window.scrollTo({
      top: screenHeight,
      behavior: "smooth"
    });
  };
  return (
    <motion.div
      variants={childVariants}
      initial="hidden"
      transition={{ delay: 1, duration: 0.4 }}
      viewport={{ once: true }}
      whileInView="visible"
      className="fill-white text-white absolute left-0 top-auto bottom-10 w-full justify-between text-center"
      style={{ opacity: 1, transform: "none" }}>
      <button type="button" onClick={scrollDown} className=" cursor-pointer text-xs font-medium uppercase tracking-widest transition-all hover:text-primary">
        <svg
          strokeWidth={0}
          viewBox="0 0 24 24"
          className=" inline animate-bounce text-base"
          height="1em"
          width="1em">
          <g>
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M13 16.172l5.364-5.364 1.414 1.414L12 20l-7.778-7.778 1.414-1.414L11 16.172V4h2v12.172z" />
          </g>
        </svg>
        <span className="pl-2">Scroll Down</span>
      </button>
    </motion.div>
  )
}

export default Scroll;