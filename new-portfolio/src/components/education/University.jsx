import p1 from '../../assets/images/UET.svg';
function University() {
    const proj_list = [
        {
            title: 'University of Engineering and Technology, Lahore',
            pic: p1,
            description: 'Oct 2019 - May 2023',
            tech_stack: ['Flask', 'TailwindCSS'],
            github: 'Bechelor In Engineering (Computer Science)',
            live: 'abc',

        }
    ]
    const redered_proj_list = proj_list.map((proj) => (
        <li>
            <div className="flex flex-col md:gap-8 md:flex-row mx-auto max-w-lg md:max-w-[60rem]  text-white">
                <div className="overflow-hidden h-auto rounded-full mx-auto">
                    <img src={proj.pic} className="h-48 pt-1 mb-6" alt="UET Logo" />


                </div>
                <div className='flex flex-col h-auto justify-stretch w-full p-6 md:p-8 shadow border rounded-lg border-gray-600  bg-gray-800'>
                    <div className='flex flex-col md:flex-row md:gap-4'>
                        <h3 className="mb-2 md:mb-0 text-2xl font-semibold">{proj.title}</h3>
                        <p className="mb-2 font-light md:text-lg text-gray-400 min-w-fit">{proj.description}</p>
                    </div>
                    <p className="mb-2 font-light md:text-xl text-gray-400">{proj.github}</p>


                </div>
                {/* <div className='flex gap-4 justify-center mt-4'>
                        {proj.tech_stack.map((tech) => (
                            <p className='bg-slate-500 shadow-lg text-gray-100 py-2 px-5 rounded'>{tech}</p>
                        ))}
                    </div>
                    <div className='flex gap-4 justify-evenly mt-12'>

                        <a href={proj.github} className='fill-white hover:fill-blue-700 text-white hover:text-blue-700 inline-flex items-center gap-2'>Github
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 496 512"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" /></svg>
                        </a>
                        <a href={proj.live} className='fill-white hover:fill-blue-700 text-white hover:text-blue-700 inline-flex items-center gap-2'>Live
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" /></svg>
                        </a>
                    </div> */}
            </div>
        </li>
    ))
    return (
        <section className="relative">
            {/* <div className="absolute left-0 top-0 h-full w-full"></div> */}
            <div className="max-w-screen-xl container  mx-auto py-20 px-4">
            <div className="mx-auto max-w-screen-md text-center mb-12">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-white">Degrees Received</h2>
                    <p className="font-light text-gray-500 md:text-xl">-- Sculpting Knowledge --</p>
                </div>
                <hr class="md:mx-auto border-gray-700 mb-6 md:mb-8" />
                <div className="flex w-full items-center justify-center ">
                    <ul>
                        {redered_proj_list}
                    </ul>


                </div>
            </div>
        </section>
    )
}
export default University;    