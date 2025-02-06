import { FaFacebook, FaGithub, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { MdOutlineWifiCalling3 } from 'react-icons/md';
import { RiCustomerService2Fill } from "react-icons/ri";
import bike from '../../assets/logo/bikeLogo.png'
const Footer = () => {
    return (
        <div className='bg-sky-950'>
            <div className='flex justify-between px-16 pt-10'>
                <div>
                    <div className="  gap-1">
                        <img className="w-20 h-20" src={bike} alt="" />
                        <h1 className="text-2xl italic font-bold relative bottom-5 text-sky-600">Mousby</h1>
                    </div>
                </div>
                <div className='pr-6'>
                    <h1 className='text-xl text-white font-bold uppercase mb-3'>Follow Us</h1>
                    <div className='text-white text-3xl flex gap-3'>
                        <FaFacebook />
                        <FaTwitter />
                        <FaGithub />
                        <FaInstagram />
                        <FaYoutube/>
                    </div>
                </div>
            </div>
            <div className='  grid grid-cols-4 py-10 px-14'>
                <div className='text-white'>
                    <RiCustomerService2Fill className='text-5xl rounded-full p-2 bg-sky-900' />
                    <h1 className='uppercase text-lg font-semibold my-2'>mousby mirpur 2</h1>
                    <div className='flex gap-2'>
                        <MdOutlineWifiCalling3 className='text-xl text-sky-400 bg-white rounded-full p-1 relative top-1' />
                        <p className='text-xl font-semibold mb-2'>01752966422</p>
                    </div>
                    <div className='text-gray-300 text-sm'>
                        <p>Mirpur</p>
                        <p className='mt-1'>Sawari, BD, H-25, R-5, Block-A, Mirpur-2, Dhaka,</p>
                        <p className='my-1'>Dhaka Metro, Dhaka 1216</p>
                        <p>Bangladesh</p>
                    </div>
                </div>
                <div className='text-white'>
                    <RiCustomerService2Fill className='text-5xl rounded-full p-2 bg-sky-900' />
                    <h1 className='uppercase text-lg font-semibold my-2'>Exchange point</h1>
                    <div className='flex gap-2'>
                        <MdOutlineWifiCalling3 className='text-xl text-sky-400 bg-white rounded-full p-1 relative top-1' />
                        <p className='text-xl font-semibold mb-2'>01752966422</p>
                    </div>
                    <div className='text-gray-300 text-sm'>
                        <p>Uttera</p>
                        <p className='mt-1'>Sawari, BD, H-25, R-5, Block-A, Mirpur-2, Dhaka,</p>
                        <p className='my-1'>Dhaka Metro, Dhaka 1216</p>
                        <p>Bangladesh</p>
                    </div>
                </div>
                <div className='text-white'>
                    <RiCustomerService2Fill className='text-5xl rounded-full p-2 bg-sky-900' />
                    <h1 className='uppercase text-lg font-semibold my-2'>mousby Gazipur </h1>
                    <div className='flex gap-2'>
                        <MdOutlineWifiCalling3 className='text-xl text-sky-400 bg-white rounded-full p-1 relative top-1' />
                        <p className='text-xl font-semibold mb-2'>01752966422</p>
                    </div>
                    <div className='text-gray-300 text-sm'>
                        <p>Gazipur</p>
                        <p className='mt-1'>Sawari, BD, H-25, R-5, Block-A, Mirpur-2, Dhaka,</p>
                        <p className='my-1'>Dhaka Metro, Dhaka 1216</p>
                        <p>Bangladesh</p>
                    </div>
                </div>
                <div className='text-white'>
                    <RiCustomerService2Fill className='text-5xl rounded-full p-2 bg-sky-900' />
                    <h1 className='uppercase text-lg font-semibold my-2'>mousby mirpur 2</h1>
                    <div className='flex gap-2'>
                        <MdOutlineWifiCalling3 className='text-xl text-sky-400 bg-white rounded-full p-1 relative top-1' />
                        <p className='text-xl font-semibold mb-2'>01752966422</p>
                    </div>
                    <div className='text-gray-300 text-sm'>
                        <p>Sreepur</p>
                        <p className='mt-1'>Sawari, BD, H-25, R-5, Block-A, Mirpur-2, Dhaka,</p>
                        <p className='my-1'>Dhaka Metro, Dhaka 1216</p>
                        <p>Bangladesh</p>
                    </div>
                </div>
            </div>
            <div className='text-lg font-semibold text-white flex justify-evenly pb-12'>
                <p>Servicing</p>
                <p>Privacy Policy</p>
                <p>Terms & Conditions</p>
            </div>
        </div>
    );
};

export default Footer;