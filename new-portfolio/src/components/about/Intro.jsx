import Scroll from "./Scroll";
import Socials from "./Socials";
function Intro() {
  return (
    <div className="px-4 w-full py-20 text-center md:w-3/4">
      <div className="relative mb-5 inline-block overflow-hidden rounded-full align-middle">
        <span className="herosection-imageanimation absolute left-0 top-0 z-10 h-full w-full animate-spin rounded-full bg-gradient-to-tr from-primary to-transparent"></span>
        <div>
          <img
            className=""
            src="https://media.licdn.com/dms/image/D4D03AQGgAJd7HnYLpg/profile-displayphoto-shrink_200_200/0/1672036507003?e=1703721600&v=beta&t=JvLzOxNLvDuh0tC90-dBOmIUotOP4VH6NcyQQHCV8Ms"
            alt="Moatassem"
          />
        </div>
      </div>

      <h1 className="text-white mb-5 text-5xl font-bold">Hi, I am Moatassem Billah</h1>

      <p className="text-white mb-0 text-xl">MERN | Python | Flask Dev | AI Enthusiast | Mentor@MLSA | SSR IEEE Faisalabad Sub Section | Former Google DSC Lead'22 | β Microsoft Learn Student Ambassador</p>
      <div className="mt-7 text-center" >
        <Socials />
      </div>
      
      <Scroll />
    </div>
  );
}

export default Intro;
