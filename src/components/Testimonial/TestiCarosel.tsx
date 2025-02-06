// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import required modules
import { Autoplay, Navigation } from 'swiper/modules';
import TestiSlide from './TestiSlide';

export default function TestiCarosel() {
    return (
        <div>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
             
                navigation={true}
                modules={[ Autoplay, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <TestiSlide />
                </SwiperSlide>
                <SwiperSlide>
                    <TestiSlide />
                </SwiperSlide>
                <SwiperSlide>
                    <TestiSlide />
                </SwiperSlide>
                <SwiperSlide>
                    <TestiSlide />
                </SwiperSlide>
                <SwiperSlide>
                    <TestiSlide />
                </SwiperSlide>
                <SwiperSlide>
                    <TestiSlide />
                </SwiperSlide>
            </Swiper>
        </div>
    );
}
