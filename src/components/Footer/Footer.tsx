import { Link } from "react-router-dom";
import logo from "../../assets/teacherlagbe.png";
import toast from "react-hot-toast";

const Footer = () => {
  const subscribeHandler = () => {
    toast("Sorry, This service is not available!", {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6 text-[#00ccb1]"
        >
          <path
            fillRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 0 0-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634Zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 0 1-.189-.866c0-.298.059-.605.189-.866Zm-4.34 7.964a.75.75 0 0 1-1.061-1.06 5.236 5.236 0 0 1 3.73-1.538 5.236 5.236 0 0 1 3.695 1.538.75.75 0 1 1-1.061 1.06 3.736 3.736 0 0 0-2.639-1.098 3.736 3.736 0 0 0-2.664 1.098Z"
            clipRule="evenodd"
          />
        </svg>
      ),
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };
  return (
    <div className="bg-[#00ccb1] w-full">
      <footer className="container mx-auto px-4 pb-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Logo Section */}
        <aside className="flex justify-center md:items-center">
          <Link
            to="/"
            className="hover:opacity-60 transition-opacity duration-300"
          >
            <img className="max-w-36" src={logo} alt="Tuition Point" />
          </Link>
        </aside>

        {/* Note for Users Section */}
        <nav className="text-black">
          <h4 className="font-semibold text-xl pb-2">Note for Users</h4>
          <span className="block border-b-2 border-white w-12 mb-4"></span>
          <p className="text-justify text-base">
            Join a community where learning meets opportunity! Connect tutors
            and students, share knowledge through blogs, and grow together.
            Unlock your potential today!
          </p>
        </nav>

        {/* Newsletter Section */}
        <div className="text-black">
          <h4 className="font-semibold text-xl pb-2">Newsletter</h4>
          <span className="block border-b-2 border-white w-12 mb-4"></span>
          <fieldset className="form-control">
            <label className="label-text pb-3">Enter your email address</label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="username@site.com"
                className="w-full sm:w-auto flex-grow p-3 border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-slate-700 placeholder:text-slate-500"
              />
              <button
                onClick={() => subscribeHandler()}
                className="bg-white text-[#00ccb1] px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-300"
              >
                Subscribe
              </button>
            </div>
          </fieldset>
        </div>
      </footer>

      {/* Copyright Section */}
      <div className="bg-[rgb(39,39,39)] py-4">
        <p className="text-center text-white text-sm">
          Copyright © {new Date().getFullYear()} - All rights reserved by
          Tuition Point
        </p>
      </div>
    </div>
  );
};

export default Footer;
