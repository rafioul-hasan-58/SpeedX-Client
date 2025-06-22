import { FaQuoteRight } from "react-icons/fa";
const TestiSlide = ({ description, photo, name, location }: { description: string, photo: string, name: string, location: string }) => {
    return (
        <div className="bg-white lg:w-[400px] ">
            <div>
                <p className="px-8 py-8 lg:w-[330px]">{description}</p>
            </div>
            <div className="flex justify-between px-8 py-1">
                <div className="flex gap-3">
                    <img className="rounded-full h-[60px] w-[60px]" src={photo} alt="bike" />
                    <div>
                        <h1>{name}</h1>
                        <p>{location}</p>
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