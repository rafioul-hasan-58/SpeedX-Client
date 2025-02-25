
interface BannerSlideProps {
    img: string;
    style?: string;
}

const BannerSlide = ({ img, style }: BannerSlideProps) => {
    return (
        <div className="flex justify-center items-center">
            <img className={` ${style}`} src={img} alt="" />
        </div>
    );
};

export default BannerSlide;