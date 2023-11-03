import { motion } from "framer-motion";
import { childVariants } from "./animationVarients";
function HeaderC({ topPadding = 'mt-14',tran='0.5', ...props }) {
    const tran2 = Number(tran) + 0.2;
    return (
        <section className="relative">
            <div className="main-bg absolute py left-0 top-0 h-full w-full"></div>
            <div
                className="max-w-screen-xl container  mx-auto">
                <div className="flex w-full items-center justify-center">
                    <div className={topPadding}>
                        <div className="py-16 px-4 mx-auto max-w-screen-md text-center">
                            <motion.h2 
                            variants={childVariants}
                            initial="hidden"
                            transition={{ delay:tran, duration: 0.4 }}
                            viewport={{ once: true }}
                            whileInView="visible"
                            className="mb-4 text-4xl tracking-tight font-extrabold text-white">
                                {props.heading}
                                </motion.h2>
                            <motion.p 
                            variants={childVariants}
                            initial="hidden"
                            transition={{ delay:tran2, duration: 0.4 }}
                            viewport={{ once: true }}
                            whileInView="visible"
                            className="font-light text-gray-400 md:text-xl">
                                {props.description}
                                </motion.p>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="md:mx-auto border-gray-700" />
        </section>
    )
}
export default HeaderC;