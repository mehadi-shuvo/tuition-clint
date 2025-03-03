import { TPost, TUser } from "../../pages/Home/types";
import { useAppSelector } from "../../redux/hooks";
import { useAuthCurrentUser } from "../../redux/features/auth/authSlice";
import toast from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";
import moment from "moment";

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
      data-aos="zoom-out-up"
      data-aos-duration="1000"
      className="secondary-bg rounded-lg px-5 py-10"
    >
      <p className="text-2xl font-medium ">{post.title}</p>
      <div className="md:flex md:mt-5">
        <div className="md:w-1/4 pr-2">
          <p className="flex gap-5 mt-3 md:mt-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912l-.003.002c-.114.06-.227.119-.34.18a.75.75 0 0 1-.707 0A50.88 50.88 0 0 0 7.5 12.173v-.224c0-.131.067-.248.172-.311a54.615 54.615 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.123 56.123 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z" />
              <path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.284a.75.75 0 0 1-.46.711 47.87 47.87 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.87 47.87 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.442.121-2.87.255-4.286.921.304 1.83.634 2.726.99v1.27a1.5 1.5 0 0 0-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.66a6.727 6.727 0 0 0 .551-1.607 1.5 1.5 0 0 0 .14-2.67v-.645a48.549 48.549 0 0 1 3.44 1.667 2.25 2.25 0 0 0 2.12 0Z" />
              <path d="M4.462 19.462c.42-.419.753-.89 1-1.395.453.214.902.435 1.347.662a6.742 6.742 0 0 1-1.286 1.794.75.75 0 0 1-1.06-1.06Z" />
            </svg>
            {post.class}
          </p>
          <p className="text-lg flex gap-5 capitalize mt-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                clipRule="evenodd"
              />
            </svg>
            {post.thana == "select Upazila" ? "" : post.thana}
            {post.thana == "select Upazila" ? "" : ","} {post.district}
          </p>
          <p className="mt-3 flex gap-3 brand-text-color">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            {moment(post?.createdAt).toNow(true)} ago
          </p>
        </div>
        <p
          style={{ whiteSpace: "pre-wrap" }}
          className="mt-5 text-base font-light tracking-wide md:w-3/4 md:mt-0"
        >
          {post.description}
        </p>
      </div>
      <div className="flex justify-center items-center mt-8">
        <button
          onClick={handleWhatsApp}
          className="bg-green-700 hover:bg-green-600 transition-all uppercase font-semibold text-lx py-2 px-4 flex items-center justify-center gap-2 rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M5.337 21.718a6.707 6.707 0 0 1-.533-.074.75.75 0 0 1-.44-1.223 3.73 3.73 0 0 0 .814-1.686c.023-.115-.022-.317-.254-.543C3.274 16.587 2.25 14.41 2.25 12c0-5.03 4.428-9 9.75-9s9.75 3.97 9.75 9c0 5.03-4.428 9-9.75 9-.833 0-1.643-.097-2.417-.279a6.721 6.721 0 0 1-4.246.997Z"
              clipRule="evenodd"
            />
          </svg>
          WhatsAPP
        </button>
      </div>
    </div>
  );
};

export default PostCard;
