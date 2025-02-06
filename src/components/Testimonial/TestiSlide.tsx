import { FaQuoteRight } from "react-icons/fa";
import head from '../../assets/logo/Head.avif'
const TestiSlide = () => {
    return (
        <div className="bg-white w-[450px] ">
            <div>
                <p className="px-8 py-8 w-[350px]">Powered by the air-cooled, 149cc single-cylinder engine with closed loop fuel injection system, FZ-S FI V2 ensures  </p>
            </div>
            <div className="flex justify-between px-8">
                <div className="flex">
                    <img className="h-[60px] w-[60px]" src={head} alt="" />
                    <div>
                        <h1>Rafioul Hasan</h1>
                        <p>Gosinga,Sreepur,Gazipur</p>
                    </div>
                </div>
                <div>
                    <FaQuoteRight className="relative top-2" size={28} color="lightblue" />
                </div>
            </div>
        </div>
    );
};

export default TestiSlide;