import { Button } from "antd";
import img from '../../assets/logo/callLogo.png';
import bike from '../../assets/logo/bikeLogo.png'
import { Link } from "react-router-dom";
const SearchLogo = () => {
    return (
        <nav className=" my-3  px-20 border-b-[1px] border-b-gray-200">
            <div className="flex items-center justify-between">
                {/* Left side */}
                <div className="flex gap-20 items-center ">
                    <div className="lg:block hidden gap-1">
                        <img className="w-16 h-16" src={bike} alt="" />
                        <h1 className="text-xl italic font-bold relative bottom-5 text-sky-600">Mousby</h1>
                    </div>
                    <div className="flex items-center">
                        <input
                            style={{ borderRadius: '100px 0px 0px 100px' }}
                            className="h-[44px] lg:w-[380px] border pl-7 placeholder-gray-600 border-gray-400 focus:outline-none"
                            type="text"
                            placeholder="Search Bike here"
                        />
                        <div style={{ borderRadius: '0px 20px 20px 0px' }} className="bg-sky-400 px-5 h-[44px] rounded-r-full">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="relative top-3 feather feather-search text-white" width="22" height="22">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="16" y1="16" x2="21" y2="21"></line>
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-6">
                    <div className="  md:flex items-center lg:relative right-32">
                        <div className="border-gray-200 rounded-full border p-2 mr-3">
                            <img className="h-6 w-6" src={img} alt="Support Logo" />
                        </div>
                        <div className="text-sky-400">
                            <p>Support & order</p>
                            <p>01752966422</p>
                        </div>
                    </div>
                 <Link to='/SignIn'>
                 <div className="flex bg-sky-400 px-3 py-2 rounded-full items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="relative  left-2 z-40 feather text-white feather-user" width="18" height="18">
                            <path d="M12 2C10.343 2 9 3.343 9 5s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zM12 13c-4.418 0-8 2.239-8 5v2h16v-2c0-2.761-3.582-5-8-5z"></path>
                        </svg>
                        <Button className="focus:outline-none px-3 py-2" style={{ border: '1px solid #38bdf8', backgroundColor: '#38bdf8', color: 'white' }}>Login</Button>
                    </div>
                 </Link>
                </div>
            </div>
        </nav>
    );
};

export default SearchLogo;
