import "../../App.css";
import { phoneSVG } from "../../assets/svgs/localSVGs";
const PhoneButton = () => {
  return (
    <a href="tel:+4733378901" target="_self">
      <button className="flex items-center gap-1 px-4 py-2 rounded-md call-btn  text-white font-bold transition duration-200 hover:bg-white capitalize hover:text-black border-2 border-transparent hover:shadow-xl">
        {phoneSVG}
        Call Now
      </button>
    </a>
  );
};

export default PhoneButton;
