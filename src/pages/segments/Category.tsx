import CategoryCard from "@/components/Card/CategoryCard";
import { categories } from "@/constant/Category.constant";

const Category = () => {
    return (
        <div>
            <h1 className="text-4xl font-bold my-10">Categories</h1>
            <div className="grid grid-cols-4 gap-5">
                {
                    categories.map((category, idx) => (<CategoryCard key={idx} category={category} />))
                }
            </div>
        </div>
    );
};

export default Category;