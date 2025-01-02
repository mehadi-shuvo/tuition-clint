import { Link } from "react-router-dom";
import logo from "../../assets/logo4.png";

const Footer = () => {
  return (
    <div className="bg-[#00ccb1] w-full">
      <footer className="flex gap-10 pt-10 w-4/5 mx-auto text-neutral-content">
        <aside className="flex-shrink-0">
          <Link to={"/"}>
            {" "}
            <img className="size-[200px]" src={logo} alt="tuition point" />
          </Link>
        </aside>
        <nav className="text-black grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="secondary-font text-xl pb-2">Note for Users</h4>
            <span className="block border-b border-b-white"></span>
            <p className="text-justify text-base pt-5 pr-8">
              Join a community where learning meets opportunity! Connect tutors
              and students, share knowledge through blogs, and grow together.
              Unlock your potential today!
            </p>
          </div>
          <div>
            <h4 className="secondary-font text-xl pb-2">Newsletter</h4>
            <span className="block border-b border-b-white"></span>
            <fieldset className="form-control pt-5">
              <span className="label-text pb-3">Enter your email address</span>

              <div className="join">
                <input
                  type="text"
                  placeholder="username@site.com"
                  className="input input-bordered border-white join-item rounded-none text-slate-600 placeholder:text-slate-500 outline-none focus:outline-none focus:border-white"
                />
                <button className="btn btn-primary border-white join-item rounded-none">
                  Subscribe
                </button>
              </div>
            </fieldset>
          </div>
        </nav>
      </footer>
      <div>
        <p className="text-center py-3 bg-[rgb(39,39,39)]">
          Copyright © {new Date().getFullYear()} - All right reserved by Tuition
          Point
        </p>
      </div>
    </div>
  );
};

export default Footer;
