import proj_list from "./projectList";
import { Link } from 'react-router-dom';
import { useState } from "react";
import { motion } from "framer-motion";
import { childVariants, parentVariants } from "../common/animationVarients";

function Projects() {
    const [showFullProj, setshowFullProj] = useState(false);
    const redered_proj_list = []
    for (const proj of proj_list) {
        redered_proj_list.push(
            <motion.li 
            variants={childVariants}
            initial="hidden"
            transition={{ delay:0.2, duration: 0.4 }}
            viewport={{ once: true }}
            whileInView="visible"
            key={proj.title}>
                <div className="flex flex-col md:gap-8 md:flex-row mx-auto max-w-lg md:max-w-[70rem] md:h-96 rounded-lg border shadow-lg border-gray-600 md:p-8 p-6 bg-gray-800 text-white">
                    <div className="overflow-hidden shadow-lg w-full md:w-[36rem] h-auto rounded-lg">
                        <img src={proj.pic} className="translate-y-0 aspect-[16/9] object-contain" alt={proj.title} />
                    </div>
                    <div className='flex flex-col h-auto justify-center text-center w-full md:w-[25rem] px-4 py-8'>
                        <h3 className="mb-4 text-2xl font-semibold">{proj.title}</h3>
                        <p className="font-light md:text-lg text-gray-400">{proj.description}</p>
                        <div className='flex flex-wrap gap-4 justify-center mt-4'>
                            {proj.tech_stack.map((tech, index) => (
                                <p key={index} className='bg-gray-700 shadow-lg text-gray-100 py-2 px-5 rounded'>{tech}</p>
                            ))}
                        </div>
                        <div className='flex gap-4 justify-evenly mt-12'>
                            <a href={proj.github} className='fill-white text-white hover:underline hover:underline-offset-4 inline-flex items-center gap-2'>Github
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 496 512"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" /></svg>
                            </a>
                            {
                                proj.live ? (
                                    <a href={proj.live} className='fill-white text-white hover:underline hover:underline-offset-4  inline-flex items-center gap-2'>Live
                                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" /></svg>
                                    </a>
                                ) : null
                            }
                        </div>
                    </div>
                </div>
            </motion.li>
        )
        if (proj.id === '11' && showFullProj === false) {
            break;
        }

    }
    return (
        <section className="relative">
            <div className="max-w-screen-xl container mx-auto py-20 px-4">
                <div className="flex w-full items-center justify-center ">
                    <motion.ul
                        variants={parentVariants}
                        initial="hidden"
                        transition={{ delay: 0.9, duration: 0.5 }}
                        viewport={{ once: true }}
                        whileInView="visible"
                        className='space-y-8'>
                        {redered_proj_list}
                    </motion.ul>
                </div>
                <div className=" pt-9 flex justify-center">
                    <Link
                        onClick={() => setshowFullProj(!showFullProj)}
                        className="container max-w-fit rounded-lg border shadow-lg border-gray-600 bg-gray-700  gap-3 inline-flex fill-white hover:fill-gray-950 text-white hover:text-gray-950 font-medium px-3 py-2 md:px-7 md:py-2.5">
                        {showFullProj ? (
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
export default Projects;    