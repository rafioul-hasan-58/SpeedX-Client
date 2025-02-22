
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';


// import required modules
import { Autoplay, } from 'swiper/modules';
import BannerSlide from './BannerSlide';

export default function BannerCarosel() {
    return (
        <>
            <Swiper
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                loop={true}
                modules={[Autoplay]}
                className="mySwiper">
                <SwiperSlide>
                    <BannerSlide style={'w-[410px] relative top-16'} img={'https://i.ibb.co.com/Xxvz5Y4Q/1.png'}></BannerSlide>
                </SwiperSlide>
                <SwiperSlide>
                    <BannerSlide style={'w-[350px]'} img={'https://i.ibb.co.com/fdRd2Rm2/motor1.jpg'}></BannerSlide>
                </SwiperSlide>
                <SwiperSlide>
                    <BannerSlide style={'relative top-8 w-[380px]'} img={'https://i.ibb.co.com/0RcVf0Pq/motor2.jpg'}></BannerSlide>
                </SwiperSlide>
                <SwiperSlide>
                    <BannerSlide style={'relative top-12  w-[380px]'} img={'https://i.ibb.co.com/cX8t5pyh/motor3.jpg'}></BannerSlide>
                </SwiperSlide>
                <SwiperSlide>
                    <BannerSlide style={'relative top-12  w-[400px]'} img={'https://i.ibb.co.com/NdS1140m/motor4.jpg'}></BannerSlide>
                </SwiperSlide>
            </Swiper>
        </>
    );
}
