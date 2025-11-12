import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

interface ICategory {
    image: string;
    name: string;
    to: string;
}
const CategoryCard = ({ category }: { category: ICategory }) => {
    return (
        <div className="bg-white lg:px-5 px-2 lg:py-8 py-3 rounded-md border-2 border-sky-100">
            <Link to={category.to}>
                <section>
                    <img className="lg:w-[60px] w-[30px] lg:h-[60px] h-[30px]" src={category.image} alt="img" />
                </section>
                <section className="flex justify-between items-center">
                    <p className="lg:text-xl lg:font-bold font-semibold text-sky-500 lg:mt-4 mt-2">{category.name}</p>
                    <FaArrowRight className="lg:block hidden mt-4 w-[30px] h-[30px] bg-sky-500 text-white rounded-full text-2xl p-2" />

                </section>
            </Link>
        </div>
    );
};

export default CategoryCard;