
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import img1 from '../../assets/Images/Img1.jpg'
import img2 from '../../assets/Images/Img2.jpg'
import img3 from '../../assets/Images/Img3.jpg'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';



// import required modules
import { Autoplay, Pagination} from 'swiper/modules';
import Slide from './Slider';

export default function Carosel() {
  return (
    <div className='lg:my-10'>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Slide image={img1}></Slide>
          </SwiperSlide>
        <SwiperSlide>
        <Slide image={img2}></Slide>
        </SwiperSlide>
        <SwiperSlide>
        <Slide image={img3}></Slide>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
