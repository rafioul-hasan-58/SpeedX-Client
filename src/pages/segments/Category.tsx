import CategoryCard from "@/components/Card/CategoryCard";
import { categories } from "@/constant/Category.constant";

const Category = () => {
    return (
        <div>
            <h1 className="lg:text-4xl  mb-2 text-3xl font-bold lg:my-10">Categories</h1>
            <div className="grid lg:grid-cols-4 gap-5 grid-cols-2">
                {
                    categories.map((category, idx) => (<CategoryCard key={idx} category={category} />))
                }
            </div>
        </div>
    );
};

export default Category;