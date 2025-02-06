

const Slide = ({image}: { image: string;}) => {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
      {/* Background Image */}
      <img src={image} alt="slide" className="w-full h-full object-cover" />

      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 animate-gradientMove"></div>
    </div>
  );
};

export default Slide;
