import QNAAccordion from "../../components/Accordion/QNAAccordion";
import { PrimaryCard } from "../../components/Cards/PrimaryCard";
import "../../App.css";
import Banner from "./Banner";
import AOS from "aos";
import "aos/dist/aos.css";

const card = {
  image: "https://i.ibb.co/QC3KmVK/aboutMe.jpg",
  name: "John Doe",
  description: "This is a description of the card.",
  id: "1",
};

{
  /* <a href="https://ibb.co/NmdyYqy"><img src="https://i.ibb.co/QC3KmVK/aboutMe.jpg" alt="aboutMe" border="0"></a><br /><a target='_blank' href='https://emoticoncentral.com/category/smiling-face-with-halo'>smiling face with halo smileys</a><br /> */
}
AOS.init();

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      {/*======== teachers section ==========*/}
      <div className="py-20">
        <div>
          <h1 className="uppercase text-center text-5xl pb-10 font-bold">
            <span>O</span>
            <span>U</span>
            <span>r</span>
            <span> </span>
            <span
              data-aos="zoom-in-left"
              data-aos-delay="50"
              data-aos-duration="500"
            >
              <span>T</span>
              <span>E</span>
              <span>a</span>
              <span>c</span>
              <span>h</span>
              <span>e</span>
              <span>r</span>
              <span>s</span>
            </span>
          </h1>
        </div>
        <div className="w-4/5 mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <PrimaryCard
            image={card.image}
            name={card.name}
            description={card.description}
            id={card.id}
          ></PrimaryCard>
          <PrimaryCard
            image={card.image}
            name={card.name}
            description={card.description}
            id={card.id}
          ></PrimaryCard>
          <PrimaryCard
            image={card.image}
            name={card.name}
            description={card.description}
            id={card.id}
          ></PrimaryCard>
          <PrimaryCard
            image={card.image}
            name={card.name}
            description={card.description}
            id={card.id}
          ></PrimaryCard>
          <PrimaryCard
            image={card.image}
            name={card.name}
            description={card.description}
            id={card.id}
          ></PrimaryCard>
          <PrimaryCard
            image={card.image}
            name={card.name}
            description={card.description}
            id={card.id}
          ></PrimaryCard>
        </div>
      </div>
      {/* ========= QNA section */}
      <div className="py-20 w-4/5 mx-auto grid md:grid-cols-2 gap-5">
        <div className="flex justify-center items-center bg-slate-950 rounded-xl py-5">
          <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-[#00ccb1] to-violet-500 text-7xl font-extrabold tracking-widest secondary-font">
            QnA
          </h1>
        </div>
        <QNAAccordion></QNAAccordion>
      </div>
    </div>
  );
};

export default Home;
