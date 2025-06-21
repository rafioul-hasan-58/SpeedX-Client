import { FaFacebook, FaGithub, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { MdOutlineWifiCalling3 } from 'react-icons/md';
import { RiCustomerService2Fill } from "react-icons/ri";
import bike from '../../assets/logo/bikeLogo.png'
const Footer = () => {
    const locations = [
        {
            branchName: "SpeedX Mirpur Hub",
            area: "Mirpur",
            addressLine: "House 12, Road 7, Block B",
            city: "Dhaka",
            postalCode: "1216",
            district: "Dhaka North",
            country: "Bangladesh",
            phone: "+8801711001122"
        },
        {
            branchName: "SpeedX Uttara Outlet",
            area: "Uttara",
            addressLine: "Plot 30, Sector 4, Road 12",
            city: "Dhaka",
            postalCode: "1230",
            district: "Dhaka North",
            country: "Bangladesh",
            phone: "+8801711001133"
        },
        {
            branchName: "SpeedX Gazipur Point",
            area: "Tongi",
            addressLine: "Holding 58, Station Road",
            city: "Gazipur",
            postalCode: "1710",
            district: "Gazipur",
            country: "Bangladesh",
            phone: "+8801711001144"
        },
        {
            branchName: "SpeedX Sreepur Branch",
            area: "Sreepur",
            addressLine: "Ward 3, Main Bazar Road",
            city: "Sreepur",
            postalCode: "1740",
            district: "Gazipur",
            country: "Bangladesh",
            phone: "+8801711001155"
        }
    ];


    return (
        <div className='bg-sky-950'>
            <div className='flex justify-between px-16 pt-10'>
                <div>
                    <div className="  gap-1">
                        <img className="w-20 h-20" src={bike} alt="" />
                        <h1 className="text-2xl italic font-bold relative bottom-5 text-sky-600">SpeedX</h1>
                    </div>
                </div>
                <div className='pr-6'>
                    <h1 className='text-xl text-white font-bold uppercase mb-3'>Follow Us</h1>
                    <div className='text-white text-3xl flex gap-3'>
                        <FaFacebook />
                        <FaTwitter />
                        <FaGithub />
                        <FaInstagram />
                        <FaYoutube />
                    </div>
                </div>
            </div>
            <div className='  grid lg:grid-cols-4 grid-cols-2 lg:py-10 lg:px-14 gap-2'>
                {
                    locations.map((loc, idx) => (
                        <div key={idx} className='text-white'>
                            <RiCustomerService2Fill className='text-5xl rounded-full p-2 bg-sky-900' />
                            <h1 className='uppercase text-lg font-semibold my-2'>{loc.branchName}</h1>
                            <div className='flex gap-2'>
                                <MdOutlineWifiCalling3 className='text-xl text-sky-400 bg-white rounded-full p-1 relative top-1' />
                                <p className='text-xl font-semibold mb-2'>{loc.phone}</p>
                            </div>
                            <div className='text-gray-300 text-sm'>
                                <p>{loc.area}</p>
                                <p className='mt-1'>{loc.addressLine}, {loc.city}</p>
                                <p className='my-1'>{loc.district}, {loc.postalCode}</p>
                                <p>{loc.country}</p>
                            </div>
                        </div>
                    ))
                }
                {/* <div className='text-white'>
                    <RiCustomerService2Fill className='text-5xl rounded-full p-2 bg-sky-900' />
                    <h1 className='uppercase text-lg font-semibold my-2'>speedX mirpur 2</h1>
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
                </div> */}
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