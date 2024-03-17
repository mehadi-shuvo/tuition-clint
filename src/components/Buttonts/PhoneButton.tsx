import "../../App.css";
import { phoneSVG } from "../../assets/svgs/localSVGs";
const PhoneButton = () => {
  return (
    <a href="tel:+4733378901" target="_self">
      <button className="flex items-center gap-1 px-4 py-2 rounded-md call-btn  font-bold transition duration-200 bg-white capitalize text-black hover:bg-slate-300 border-2 border-transparent hover:shadow-xl">
        {phoneSVG}
        Call Now
      </button>
    </a>
  );
};

export default PhoneButton;
