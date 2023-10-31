import HeadingP from "./HeadingP";
import Projects from "./Projects";
function Portfolio(props) {
  return (
    <div className="relative z-20 bg-[#0b1224] ">
        <HeadingP topPadding={props.topPadding} />
        <Projects />
    </div>
  );
}

export default Portfolio;