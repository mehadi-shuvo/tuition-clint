import { TPost, TUser } from "../../pages/Home/types";
import { bookSVG, locationSVG, whatsAppSVG } from "../../assets/svgs/localSVGs";
import { useAppSelector } from "../../redux/hooks";
import { useAuthCurrentUser } from "../../redux/features/auth/authSlice";
import toast from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";

const PostCard = ({ post }: { post: TPost }) => {
  AOS.init();
  const user: TUser | null = useAppSelector(useAuthCurrentUser);
  const handleWhatsApp = () => {
    if (user) {
      if (user.role === "student") {
        toast.error(
          "Request is not accepted. Only students can connect with teachers."
        );
      } else if (user.role === "teacher") {
        const phoneNumber = "01723263304";
        const whatsappUrl = `https://wa.me/${phoneNumber}`;
        window.location.href = whatsappUrl;
      }
    } else {
      toast.error("you are not authorized. Please Signup or Login!");
    }
  };

  return (
    <div
      data-aos="zoom-in"
      data-aos-delay="50"
      data-aos-duration="1000"
      className="p-1 rounded-lg bg-white hover:bg-[#00ccb1] ease-linear duration-300 transition-all hover:shadow-lg hover:shadow-[#00ccb1]"
    >
      <div className="p-5 rounded-lg bg-slate-950">
        <div className="grid md:grid-cols-2 gap-4 md:gap-0">
          <div className=" md:border-r-2 hover:border-r-[#00ccb1]">
            <h4 className="text-base font-bold text-[#00ccb1] uppercase">
              {post.title}
            </h4>
            <h5 className="font-light flex items-center gap-3 mt-3">
              {bookSVG}
              {post.class}
            </h5>
            <h6 className="font-light flex items-center gap-3 mt-2 capitalize">
              {locationSVG} {post.district}, {post.thana}
            </h6>
          </div>
          <div className="md:ml-3">
            <p className="text-sm">{post.description}</p>
          </div>
        </div>
        <div className="md:w-1/2 mx-auto">
          <button
            onClick={handleWhatsApp}
            className="flex items-center gap-2 justify-center w-full bg-green-700 hover:bg-green-800 text-lgl font-extrabold rounded-lg py-3 mt-5 delay-300 ease-linear transition-all"
          >
            {whatsAppSVG} WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
