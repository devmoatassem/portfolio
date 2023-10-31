import HeaderC from "../common/HeaderC";
import University from "./University";
import Certificates from "./Certificares";
function Education(props) {
  return (
    <div className="relative z-20 bg-[#0b1224] ">
        <HeaderC heading='Education & Certifications' description="Passionate about diverse projects, many open-source. Join me, explore, and enhance. Your input fuels progress, and I welcome fresh ideas. Let's innovate together." topPadding={props.topPadding} />
        <University />
        <Certificates />  
    </div>
  );
}

export default Education;
