import uet from '../../assets/images/UET.svg';
import { motion } from "framer-motion";
import {childVariants, parentVariants } from "../common/animationVarients";
function University() {
    const edu_list = [
        {
            name: 'University of Engineering and Technology, Lahore',
            logo: uet,
            duration: 'Oct 2019 - May 2023',
            degree: 'Bechelor In Engineering (Computer Science)',
        }
    ]
    const redered_edu_list = edu_list.map((proj, index) => (
        <li key={index}>
            <div className="flex flex-col md:gap-8 md:flex-row mx-auto max-w-lg md:max-w-[60rem]  text-white">
                <div className="overflow-hidden h-auto rounded-full mx-auto">
                    <img src={proj.logo} className="h-48 pt-1 mb-6" alt="UET Logo" />
                </div>
                <div className='flex flex-col h-auto justify-stretch w-full p-6 md:p-8 shadow-lg border rounded-lg border-gray-600  bg-gray-800'>
                    <div className='flex flex-col md:flex-row md:gap-4'>
                        <h3 className="mb-2 md:mb-0 text-2xl font-semibold">{proj.name}</h3>
                        <p className="mb-2 font-light md:text-lg text-gray-400 min-w-fit">{proj.duration}</p>
                    </div>
                    <p className="mb-2 font-light md:text-xl text-gray-400">{proj.degree}</p>
                    <ul>
                        <li>⚡ 2023: First Place in Final Year Project</li>
                        <li>⚡ 2022: Founded the Google Developer Student Club at UET Faisalabad</li>
                        <li>⚡ First Microsoft Learn Student Ambassador from Campus</li>
                        <li>⚡ Mentored Microsoft Learn Student Ambassadors</li>
                        <li>⚡ Founded the IEEE Student Branch on Campus</li>
                        <li>⚡ Made Branch Win Exemplary IEEE Student Branch Award 2023</li>
                        <li>⚡ Made Branch Win Best University Participation Award at the 14th IEEE PSYWSC</li>
                        <li>⚡ Won the 2023 Outstanding IEEE Faisalabad Student Volunteer Award</li>
                        <li>⚡ Served as the Lahore Section Lead for IEEEXtreme 17.0</li>
                        <li>⚡ Subsection Student Representative for IEEE Faisalabad Sub-Section</li>
                        <li>⚡ Organized the First Physical IEEE Faisalabad Students/YP/WIE Congress</li>
                        <li>⚡ Organized the 14th IEEE Pakistan Students/YP/WIE/SIGHT Congress</li>
                        <li>⚡ Established an IEEE WIE (Women in Engineering) affinity group</li>
                    </ul>
                </div>
            </div>
        </li>
    ))
    return (
        <section className="relative">
            <div className="max-w-screen-xl container  mx-auto py-20 px-4">
                <div className="mx-auto max-w-screen-md text-center mb-12">
                    <motion.h2
                        variants={childVariants}
                        initial="hidden"
                        transition={{ delay: 0.9, duration: 0.4 }}
                        viewport={{ once: true }}
                        whileInView="visible"
                        className="mb-4 text-4xl tracking-tight font-extrabold text-white">
                        Degrees Received
                    </motion.h2>
                    <motion.p variants={childVariants}
                        initial="hidden"
                        transition={{ delay: 1.1, duration: 0.4 }}
                        viewport={{ once: true }}
                        whileInView="visible"
                        className="font-light text-gray-400 md:text-xl">
                        -- Sculpting Knowledge --
                    </motion.p>
                </div>
                <hr className="md:mx-auto border-gray-700 mb-6 md:mb-8" />
                <div className="flex w-full items-center justify-center ">
                    <motion.ul
                        variants={parentVariants}
                        initial="hidden"
                        transition={{ delay: 1.3, duration: 0.5 }}
                        viewport={{ once: true }}
                        whileInView="visible">
                        {redered_edu_list}
                    </motion.ul>
                </div>
            </div>
        </section>
    )
}
export default University;    