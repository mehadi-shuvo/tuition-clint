import QNAAccordion from "../../components/Accordion/QNAAccordion";
import { PrimaryCard } from "../../components/Cards/PrimaryCard";
import "../../App.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useGetAllTeachersQuery } from "../../redux/features/teacher/teacherApi";
import { TTeacher } from "./types";
import PostSection from "./PostSection";
import { watchLoader } from "../../utils/loader";
import bannerImg from "../../assets/images/undraw_educator_re_ju47.svg";
import Header from "../../components/ui/Header";
import useTitle from "../../utils/useTitle";

AOS.init();

const Home = () => {
  const { data, isLoading } = useGetAllTeachersQuery("");
  useTitle("Home");
  if (isLoading) {
    return (
      <div className="w-full bg-slate-950 h-screen flex items-center justify-center">
        {watchLoader}
      </div>
    );
  }

  return (
    <div>
      {/* <Banner></Banner> */}
      <div className="py-28 grid lg:grid-cols-2 gap-10">
        <div className="px-10">
          <img className="" src={bannerImg} alt="" />
        </div>
        <div className="px-10">
          <h1 className="text-4xl md:text-7xl secondary-font">
            Your slogan will here
          </h1>
          <p className="mt-4 text-slate-400 text-xs md:text-base font-light">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Temporibus, voluptas. Lorem ipsum dolor, sit amet consectetur
            adipisicing elit. Vitae, labore?
          </p>

          <a
            className="mt-10 inline-block bg-[#00ccb1] rounded-md text-xl font-extrabold py-4 px-10"
            href="#FAQ"
          >
            Lear more
          </a>
        </div>
      </div>

      {/* =======About section============== */}
      {/* =TODO pending= */}
      <div className="home-about bg-left">
        <div className="bg-[#272727a1] w-full flex justify-end"></div>
      </div>
      {/*======== teachers section ==========*/}
      <div className="py-20">
        <Header
          heading="our tutors"
          subheading=" Meet our dedicated and experienced educators who are committed to
        helping you achieve your academic goals."
        />
        <div className="w-4/5 mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.data.map((teacher: TTeacher) => (
            <PrimaryCard
              key={teacher._id}
              id={teacher._id}
              image={teacher.photo}
              description={teacher.description}
              name={teacher.name}
              subjects={teacher.subjects}
            ></PrimaryCard>
          ))}
        </div>
      </div>

      {/* tuitions sections=================== */}
      <PostSection></PostSection>
      {/* ========= QNA section */}
      <div id="FAQ" className="py-20 w-4/5 mx-auto grid md:grid-cols-2 gap-5">
        <div className="flex justify-center items-center bg-slate-950 rounded-xl py-5">
          <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-[#00ccb1] to-violet-500 text-7xl font-extrabold tracking-widest secondary-font">
            FAQ
          </h1>
        </div>
        <QNAAccordion></QNAAccordion>
      </div>
    </div>
  );
};

export default Home;
