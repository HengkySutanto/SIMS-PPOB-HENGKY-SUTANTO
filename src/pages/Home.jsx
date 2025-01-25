import Promo from "../components/home/Promo";
import Services from "../components/home/Services";
import UserProfile from "../components/home/UserProfile"

const Home = () => {
  return (
    <div className="container mx-auto p-5 md:p-0 md:py-5 space-y-10">
      <UserProfile />
      <Services />
      <Promo />
    </div>
  );
};

export default Home; 