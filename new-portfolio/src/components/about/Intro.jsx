import Scroll from "./Scroll";
import Socials from '../common/Socials'
function Intro() {
  return (
    <div className="px-4 w-full py-20 text-center md:w-3/4">
      <div className="relative mb-5 inline-block overflow-hidden rounded-full align-middle">
        <div>
          <img
            className=""
            src="https://media.licdn.com/dms/image/D4D03AQGgAJd7HnYLpg/profile-displayphoto-shrink_200_200/0/1672036507003?e=1703721600&v=beta&t=JvLzOxNLvDuh0tC90-dBOmIUotOP4VH6NcyQQHCV8Ms"
            alt="Moatassem"
          />
        </div>
      </div>

      <h1 className="text-white mb-4 text-4xl font-extrabold">Hi, I am Moatassem Billah</h1>

      <p className="text-gray-400 mb-0 font-semibold text-xl">MERN | Python | Flask Dev | AI Enthusiast | Mentor@MLSA | SSR IEEE Faisalabad Sub Section | Former Google DSC Lead'22 | β Microsoft Learn Student Ambassador</p>
      <div className="mt-7 text-center" >
        <Socials />
      </div>
      <Scroll />
    </div>
  );
}

export default Intro;
