import About from "../Aboute/About";
import Banner from "../Banner/Banner";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <About></About>
      <h1 className="text-4xl text-center text-red-600">This is Home</h1>
    </div>
  );
};

export default Home;
