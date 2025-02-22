
const BannerSlide = ({img,style}) => {
    return (
        <div className="flex justify-center items-center">
            <img className={` ${style}`} src={img} alt="" />
        </div>
    );
};

export default BannerSlide;