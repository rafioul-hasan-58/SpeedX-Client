import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

interface ICategory {
    image: string;
    name: string;
    to: string;
}
const CategoryCard = ({ category }: { category: ICategory }) => {
    return (
        <div className="bg-white px-5 py-8 rounded-md border-2 border-sky-100">
            <section>
                <img className="w-[60px] h-[60px]" src={category.image} alt="img" />
            </section>
            <section className="flex justify-between items-center">
                <p className="text-xl font-bold text-sky-500 mt-4">{category.name}</p>
                <Link to={category.to}>
                    <FaArrowRight className="mt-4 w-[30px] h-[30px] bg-sky-500 text-white rounded-full text-2xl p-2" />
                </Link>
            </section>
        </div>
    );
};

export default CategoryCard;