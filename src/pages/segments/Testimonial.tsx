import TestiCarosel from "@/components/Testimonial/TestiCarosel";

const Testimonial = () => {
    return (
        <div>
            <div>
                <h1 className="text-3xl font-bold mb-6">What Our Customer Says </h1>
            </div>
            <div className="pb-10">
                <TestiCarosel />
            </div>
        </div>
    );
};

export default Testimonial;