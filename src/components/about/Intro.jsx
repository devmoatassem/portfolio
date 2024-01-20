import Scroll from "./Scroll";
import Socials from '../common/Socials'
import { motion } from "framer-motion"
import { childVariants } from "../common/animationVarients";
import profilePic from "../../assets/images/profile pic.jpg"

function Intro() {
  return (
    <div className="px-4 w-full py-20 text-center md:w-3/4">
      <motion.div
        variants={childVariants}
        initial="hidden"
        transition={{ delay: 0.2, duration: 0.4 }}
        viewport={{ once: true }}
        whileInView="visible"
        className="relative mb-5 border-[6px] border-gray-400 shadow-lg inline-block overflow-hidden rounded-full align-middle">
          
        <img
          className=" aspect-square w-48 h-48 object-cover"
          src={profilePic}
          alt="Moatassem" />
      </motion.div>
      <motion.h1
        variants={childVariants}
        initial="hidden"
        transition={{ delay: 0.4, duration: 0.4 }}
        viewport={{ once: true }}
        whileInView="visible"
        className="text-white mb-4 text-2xl md:text-4xl font-extrabold">
        Hi, I am Moatassem Billah
      </motion.h1>
      <motion.p
        variants={childVariants}
        initial="hidden"
        transition={{ delay: 0.6, duration: 0.4 }}
        viewport={{ once: true }}
        whileInView="visible"
        className="text-gray-400 mb-0 font-semibold text-base md:text-lg">
        {"MERN | Python | Flask Dev | AI Enthusiast | Mentor@MLSA | SSR IEEE Faisalabad Sub Section | Former Google DSC Lead'22 | β Microsoft Learn Student Ambassador"}
      </motion.p>
      <motion.div
        variants={childVariants}
        initial="hidden"
        transition={{ delay: 0.8, duration: 0.4 }}
        viewport={{ once: true }}
        whileInView="visible"
        className="mt-7 text-center" >
        <Socials />
      </motion.div>
      <Scroll />
    </div>
  );
}

export default Intro;
