// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import img1 from '../../assets/logo/Brand1.png'
import img2 from '../../assets/logo/Brand2.png'
import img3 from '../../assets/logo/Brand3.png'
import img4 from '../../assets/logo/Brand4.png'
import img5 from '../../assets/logo/Brand5.png'
import img6 from '../../assets/logo/Brand6.png'
import img7 from '../../assets/logo/Brand7.png'
import img8 from '../../assets/logo/Brand8.png'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import required modules
import { Autoplay, Navigation } from 'swiper/modules';
import BrandSlide from './BrandSlide';


export default function BrandCarosel() {
    return (
        <div>
            <Swiper
                spaceBetween={30}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}

                navigation={true}
                modules={[Autoplay, Navigation]}
                className="mySwiper"
                breakpoints={{
                    0: {
                        slidesPerView: 2
                    },
                    768: {
                        slidesPerView: 3
                    },
                    1024: {
                        slidesPerView: 5
                    },
                    1960: {
                        slidesPerView: 6
                    }
                }}
            >
                <SwiperSlide>
                    <BrandSlide img={img1} />
                </SwiperSlide>
                <SwiperSlide>
                    <BrandSlide img={img2} />
                </SwiperSlide>
                <SwiperSlide>
                    <BrandSlide img={img3} />
                </SwiperSlide>
                <SwiperSlide>
                    <BrandSlide img={img4} />
                </SwiperSlide>
                <SwiperSlide>
                    <BrandSlide img={img5} />
                </SwiperSlide>
                <SwiperSlide>
                    <BrandSlide img={img6} />
                </SwiperSlide>
                <SwiperSlide>
                    <BrandSlide img={img7} />
                </SwiperSlide>
                <SwiperSlide>
                    <BrandSlide img={img8} />
                </SwiperSlide>
            </Swiper>
        </div>
    );
}
