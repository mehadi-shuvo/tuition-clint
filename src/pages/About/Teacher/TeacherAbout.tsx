import { BackgroundBeamsDemo } from "../../../components/BackgroundBeams/BackgroundBeamsDemo";
import { BackgroundGradientRound } from "../../../components/ui/round-gradient";
import studentID from "../../../assets/images/20200117_205004-1.jpg";
import "../../../App.css";
import PhoneButton from "../../../components/Buttonts/PhoneButton";
import ContactButton from "../../../components/Buttonts/ContactButton";

const card = {
  image: "https://i.ibb.co/QC3KmVK/aboutMe.jpg",
  name: "John Doe",
  description: "This is a description of the card.",
  id: "1",
};

const subjects = ["Bangla", "English", "Physics", "Chemistry", "Math"];

const TeacherAbout = () => {
  const show = [];
  for (let i = 0; i < subjects.length; i++) {
    if (i == subjects.length - 1) {
      show.push(subjects[i]);
    } else {
      show.push(subjects[i] + " |");
    }
  }
  return (
    <div className="">
      <div>
        <BackgroundBeamsDemo />
        <div className="relative z-10 flex justify-center items-center pb-10 -mt-[100px]">
          <BackgroundGradientRound>
            <img
              className="z-10 size-48 rounded-full mx-auto"
              src={card.image}
              alt=""
            />
          </BackgroundGradientRound>
        </div>
      </div>
      <div className="w-4/5 mx-auto grid md:grid-cols-2 ">
        <div>
          <div className="">
            <h1 className="text-4xl font-bold pb-3 capitalize">
              Md Mehadi Hasan
            </h1>
            <h1 className="text-xl font-medium capitalize brand-text-color pb-3">
              Green University Of Bangladesh
            </h1>
            <h4 className="text-lg capitalize pb-2">class 9 to 12</h4>
            <h3 className="flex gap-2 text-lg pb-5">
              {show.map((subject) => (
                <span>{subject}</span>
              ))}
            </h3>
          </div>
          <div className="text-base text-slate-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nam
            laboriosam assumenda, adipisci eos repellendus ipsam reiciendis
            tempora animi placeat. Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Alias veritatis quo explicabo dolore, libero nisi
            odio ad sed at a!
          </div>
        </div>
        <div>
          <div className="md:flex md:justify-end md:flex-col md:items-end space-y-3">
            <img className="w-[300px] rounded-lg" src={studentID} alt="" />
          </div>
          <div className="flex justify-center items-center md:justify-end pt-8">
            <div className="flex gap-5">
              <PhoneButton />
              <ContactButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherAbout;
