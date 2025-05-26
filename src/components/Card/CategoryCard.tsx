
interface ICategory {
    image: string;
    name: string;
}
const CategoryCard = ({ category }: { category: ICategory }) => {
    return (
        <div className="bg-white">
            <section>
                <img src={category.image} alt="img" />
            </section>
            <section>

            </section>
        </div>
    );
};

export default CategoryCard;