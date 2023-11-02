import Socials from "./Socials";
import NavLinks from "./navbar/NavLinks";
import { Link } from "react-router-dom";
function Footer() {
    return (
        <footer className="p-4 bg-gray-800">
            <div className="mx-auto max-w-screen-xl text-center">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <div className="flex justify-center">
                            <div className="name-logo text-white">
                                <Link to="https://moatassam.com/">
                                    &lt;<span id="abcd">Moatassem Billah</span>/&gt;
                                </Link>
                            </div>
                        </div>
                    </div>
                    <ul className="flex justify-center flex-row gap-4 py-4">
                        <NavLinks />
                    </ul>
                </div>
                <hr className="my-6 md:mx-auto border-gray-700 md:my-8" />
                <div className="md:flex  md:justify-between">
                    <span className="text-sm md:text-center text-gray-400">© {new Date().getFullYear()} <Link to="https://moatassam.com/" className="hover:underline">Moatassem</Link> Made with ❤️
                    </span>
                    <div className="flex justify-center mt-4 space-x-6 md:mt-0">
                        <Socials />
                    </div>
                </div>
            </div>
        </footer>
    )
}
export default Footer;