import Scroll from "./Scroll";
import Socials from '../common/Socials'
import { motion } from "framer-motion"
import { introVariants } from "../common/animationVarients";
function Intro() {
  return (
    <div
      className="px-4 w-full py-20 text-center md:w-3/4">
      <motion.div
        variants={introVariants}
        initial="hidden"
        transition={{ delay: 0.2, duration: 0.4 }}
        viewport={{ once: true }}
        whileInView="visible"
        className="relative mb-5 inline-block overflow-hidden rounded-full align-middle">
        <img
          className=""
          src="https://media.licdn.com/dms/image/D4D03AQGgAJd7HnYLpg/profile-displayphoto-shrink_200_200/0/1672036507003?e=1703721600&v=beta&t=JvLzOxNLvDuh0tC90-dBOmIUotOP4VH6NcyQQHCV8Ms"
          alt="Moatassem"
        />
      </motion.div>

      <motion.h1
        variants={introVariants}
        initial="hidden"
        transition={{ delay: 0.4, duration: 0.4 }}
        viewport={{ once: true }}
        whileInView="visible"
        className="text-white mb-4 text-4xl font-extrabold">Hi, I am Moatassem Billah</motion.h1>

      <motion.p
        variants={introVariants}
        initial="hidden"
        transition={{ delay: 0.6, duration: 0.4 }}
        viewport={{ once: true }}
        whileInView="visible"
        className="text-gray-400 mb-0 font-semibold text-xl">
        MERN | Python | Flask Dev | AI Enthusiast | Mentor@MLSA | SSR IEEE Faisalabad Sub Section | Former Google DSC Lead'22 | β Microsoft Learn Student Ambassador
      </motion.p>
      <motion.div
        variants={introVariants}
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
