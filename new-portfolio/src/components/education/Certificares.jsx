import p1 from '../../assets/images/UET.svg';
import c1 from '../../assets/images/certificates/alphamlsa.jpg'
function Certificates() {
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
    const redered_cert_list = proj_list.map((proj) => (
        <li className="flex flex-col p-6 mx-auto max-w-lg text-center rounded-lg border shadow border-gray-600 xl:p-8 bg-gray-800 text-white">
            <div className="overflow-hidden shadow-lg w-full h-auto rounded-lg">
                <img src={c1} className="translate-y-0 h-full" alt="" />
            </div>
            <div className="flex justify-center items-baseline my-4">
                <span className="mr-2 text-xl font-semibold">My Bucket1</span>

            </div>
            <p className="font-light md:text-lg text-gray-400">Crafting Seamless Online Experiences from Frontend to Backend</p>
        </li>
    ))
    return (
        <section className="relative">
            {/* <div className="absolute left-0 top-0 h-full w-full"></div> */}
            <div className="max-w-screen-xl container  mx-auto">
                <div className="mx-auto max-w-screen-md text-center mb-12">

                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-white">Certifications</h2>
                    <p className="font-light text-gray-500 md:text-xl">-- Sculpting Knowledge --</p>
                </div>
                <div className="w-full items-center justify-center py-20 px-4">


                    <ul className='space-y-8 md:space-y-0 md:grid md:grid-cols-3 md:gap-6'>
                        {redered_cert_list}



                    </ul>




                </div>


            </div>
        </section>
    )
}
export default Certificates;    