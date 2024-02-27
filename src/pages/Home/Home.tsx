import { PrimaryCard } from "../../components/Cards/PrimaryCard";
import Banner from "./Banner";

const card = {
  image: "https://i.ibb.co/QC3KmVK/aboutMe.jpg",
  name: "John Doe",
  description: "This is a description of the card.",
  id: "1",
};

{
  /* <a href="https://ibb.co/NmdyYqy"><img src="https://i.ibb.co/QC3KmVK/aboutMe.jpg" alt="aboutMe" border="0"></a><br /><a target='_blank' href='https://emoticoncentral.com/category/smiling-face-with-halo'>smiling face with halo smileys</a><br /> */
}

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      {/*======== teachers section ==========*/}
      <div className="w-4/5 mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-4 py-20">
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
  );
};

export default Home;
