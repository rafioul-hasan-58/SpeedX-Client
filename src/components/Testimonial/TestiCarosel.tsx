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
                modules={[Autoplay, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <TestiSlide name='Rafioul Hasan' location='Sreepur,Gazipur' description='Powered by the air-cooled, 149cc single-cylinder engine with closed loop fuel injection system, FZ-S FI V2 ensures' photo='https://i.ibb.co.com/db10zNM/IMG-20211230-WA0030.jpg' />
                </SwiperSlide>
                <SwiperSlide>
                    <TestiSlide name='Alolf Hitler' location='Berlin,Germany' description='Powered by the air-cooled, 149cc single-cylinder engine with closed loop fuel injection system, FZ-S FI V2 ensures' photo='https://i.ibb.co.com/4gsc8vvp/default.jpg' />
                </SwiperSlide>
                <SwiperSlide>
                    <TestiSlide name='Hermione Granger' location='Hogwards,London' description='Powered by the air-cooled, 149cc single-cylinder engine with closed loop fuel injection system, FZ-S FI V2 ensures' photo='https://i.ibb.co.com/bjzNHzKT/Hermione-as-a-Student-1.jpg' />
                </SwiperSlide>
                <SwiperSlide>
                    <TestiSlide name='Ron Weasly' location='Hogwards,London' description='Powered by the air-cooled, 149cc single-cylinder engine with closed loop fuel injection system, FZ-S FI V2 ensures' photo='https://i.ibb.co.com/ggfM1P2/images.jpg' />
                </SwiperSlide>
                <SwiperSlide>
                    <TestiSlide name='Harry Potter' location='Hogwards,London' description='Powered by the air-cooled, 149cc single-cylinder engine with closed loop fuel injection system, FZ-S FI V2 ensures' photo='https://i.ibb.co.com/3N8qF0r/images-1.jpg' />
                </SwiperSlide>
            </Swiper>
        </div>
    );
}
