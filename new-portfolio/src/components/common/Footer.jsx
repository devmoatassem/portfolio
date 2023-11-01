import Socials from "../about/Socials";
import NavLinks from "./navbar/NavLinks";
import { Link } from "react-router-dom";
function Footer() {
    return (
        <footer class="p-4 bg-gray-800">
            <div class="mx-auto max-w-screen-xl text-center">
                <div class="md:flex md:justify-between">
                    <div class="mb-6 md:mb-0">
                        <a href="https://flowbite.com" class="flex justify-center">
                            <div className="name-logo text-white">
                                <Link href="/">
                                    &lt;<span id="abcd">Moatassem Billah</span>/&gt;
                                </Link>
                            </div>
                        </a>
                    </div>
                    <ul className="flex justify-center flex-row gap-4 py-4">
                        <NavLinks />
                    </ul>
                </div>
                <hr class="my-6 md:mx-auto border-gray-700 md:my-8" />
                <div class="md:flex  md:justify-between">
                    <span class="text-sm md:text-center text-gray-400">© 2023 <a href="https://flowbite.com" class="hover:underline">Moatassem</a> Made with ❤️
                    </span>
                    <div class="flex justify-center mt-4 space-x-6 md:mt-0">
                        <Socials />
                    </div>
                </div>
            </div>
        </footer>
    )
}
export default Footer;