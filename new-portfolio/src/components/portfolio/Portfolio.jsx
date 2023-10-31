import HeaderC from "../common/HeaderC";
import Projects from "./Projects";
function Portfolio(props) {
  return (
    <div className="relative z-20 bg-[#0b1224] ">
        <HeaderC heading='Projects' description="Passionate about diverse projects, many open-source. Join me, explore, and enhance. Your input fuels progress, and I welcome fresh ideas. Let's innovate together." topPadding={props.topPadding} />
        <Projects />
    </div>
  );
}

export default Portfolio;