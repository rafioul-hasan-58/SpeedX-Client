import Banner from "../segments/Banner";
import Category from "../segments/Category";
import FeturedBikes from "../segments/FeturedBikes";
import Testimonial from "../segments/Testimonial";
const Home = () => {

    return (
        <div className="lg:mx-20">
            <Banner />
            <Category />
            <FeturedBikes />
            <Testimonial />
        </div>
    );
};

export default Home;