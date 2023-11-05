import { useState } from "react";
import { Link } from "react-router-dom";
import certificate_list from "./certificatesList";
import { motion } from "framer-motion";
import { childVariants, parentVariants } from "../common/animationVarients";

function Certificates() {  
    const [showFullList, setShowFullList] = useState(false);
    let index = 1;
    const cert_list = [];
    for (const cert of certificate_list) {
        cert_list.push(
            <motion.li
                variants={childVariants}
                initial="hidden"
                transition={{ delay: 0.3*index, duration: 0.4 }}
                viewport={{ once: true }}
                whileInView="visible"
                key={cert.id} className="flex flex-col p-6 mx-auto max-w-lg text-center rounded-lg border shadow-lg border-gray-600 bg-gray-800 text-white">
                <div className="overflow-hidden">
                    <img src={cert.pic} className="translate-y-0 aspect-[22/17] object-contain" alt={cert.title} />
                </div>
                <div className="flex justify-center items-baseline my-4">
                    <span className="text-xl font-semibold">{cert.title}</span>
                </div>
                <p className="font-light md:text-lg text-gray-400">{cert.from}</p>
            </motion.li>

        )
        if (index < 3) {
            index++;
        }
        else{
            index = 1;
        }
        if (cert.id === '3' && showFullList === false) {
            break;
        }
    }
    return (
        <section className="relative">
            <div className="max-w-screen-xl container  mx-auto py-20 px-4">
                <div className="mx-auto max-w-screen-md text-center mb-12">
                    <motion.h2
                        variants={childVariants}
                        initial="hidden"
                        transition={{ delay: 0.3, duration: 0.4 }}
                        viewport={{ once: true }}
                        whileInView="visible"
                        className="mb-4 text-4xl tracking-tight font-extrabold text-white">
                        Certifications
                    </motion.h2>
                    <motion.p variants={childVariants}
                        initial="hidden"
                        transition={{ delay: 0.5, duration: 0.4 }}
                        viewport={{ once: true }}
                        whileInView="visible"
                        className="font-light text-gray-400 md:text-xl">
                        -- Sculpting Knowledge --
                    </motion.p>
                </div>
                <hr className="md:mx-auto border-gray-700 mb-6 md:mb-8" />
                <div className="w-full items-center justify-center">
                    <motion.ul
                        variants={parentVariants}
                        initial="hidden"
                        transition={{ delay: 0.7, duration: 0.5 }}
                        viewport={{ once: true }}
                        whileInView="visible"
                        className='space-y-8 md:space-y-0 md:grid md:grid-cols-3 md:gap-6'>
                        {cert_list}
                    </motion.ul>

                </div>
                <div className=" pt-9 flex justify-center">
                    <Link
                        onClick={() => setShowFullList(!showFullList)}
                        className="container max-w-fit rounded-lg border shadow-lg border-gray-600 bg-gray-700  gap-3 inline-flex fill-white hover:fill-gray-950 text-white hover:text-gray-950 font-medium px-3 py-2 md:px-7 md:py-2.5">
                        {showFullList ? (
                            <>
                                Show Less
                                <svg height="1em" className="my-auto" viewBox="0 0 384 512">
                                    <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                                </svg>
                            </>
                        ) : (
                            <>
                                Show More
                                <svg height="1em" className="my-auto" viewBox="0 0 384 512">
                                    <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                                </svg>
                            </>
                        )}


                    </Link>
                </div>

            </div>
        </section>
    )
}
export default Certificates;    