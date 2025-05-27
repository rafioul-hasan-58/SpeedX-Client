import Banner from "../segments/Banner";
import Category from "../segments/Category";
import FeturedBikes from "../segments/FeturedBikes";
import FeturedScooters from "../segments/FeturedScooters";
import Testimonial from "../segments/Testimonial";
import UsedBikes from "../segments/UsedBikes";
const Home = () => {

    return (
        <div className="lg:mx-20">
            <Banner />
            <Category />
            <FeturedBikes />
            <FeturedScooters />
            <UsedBikes />
            <Testimonial />
        </div>
    );
};

export default Home;