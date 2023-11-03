import { motion } from "framer-motion";
import { introVariants } from "./animationVarients";
function HeaderC({ topPadding = 'mt-14', ...props }) {
    return (
        <section className="relative">
            <div className="main-bg absolute py left-0 top-0 h-full w-full"></div>
            <motion.div
                variants={introVariants}
                initial="hidden"
                transition={{ delay: 0.5, duration: 0.4 }}
                viewport={{ once: true }}
                whileInView="visible"
                className="max-w-screen-xl container  mx-auto">
                <div className="flex w-full items-center justify-center">
                    <div className={topPadding}>
                        <div className="py-16 px-4 mx-auto max-w-screen-md text-center">
                            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-white">{props.heading}</h2>
                            <p className="font-light text-gray-400 md:text-xl">{props.description}</p>
                        </div>
                    </div>
                </div>
            </motion.div>
            <hr className="md:mx-auto border-gray-700" />
        </section>
    )
}
export default HeaderC;