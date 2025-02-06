
interface BrandSlideProps {
    img: string;
}
const BrandSlide: React.FC<BrandSlideProps> = ({ img }) => {
    return (
        <div>
            <div className='bg-white w-[210px] flex justify-center'>
                <img className='h-[120px]' src={img} alt="" />
            </div>
        </div>
    );
};

export default BrandSlide;