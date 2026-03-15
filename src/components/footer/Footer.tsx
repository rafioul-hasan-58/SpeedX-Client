import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';
import { MdOutlineWifiCalling3 } from 'react-icons/md';
import { RiCustomerService2Fill } from 'react-icons/ri';
import bike from '../../assets/logo/bikeLogo.png';

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

    const socialIcons = [
        { icon: <FaInstagram />, label: 'Instagram' },
        { icon: <FaTwitter />, label: 'Twitter' },
        { icon: <FaFacebook />, label: 'Facebook' },
        { icon: <FaLinkedin />, label: 'LinkedIn' },
        { icon: <FaYoutube />, label: 'YouTube' },
    ];

    return (
        <footer
            className="w-full"
            style={{
                background: 'linear-gradient(135deg, #0a1628 0%, #0d1f3c 40%, #0a2540 70%, #061525 100%)',
                fontFamily: "'Segoe UI', sans-serif",
            }}
        >
            <div className="max-w-[1400px] mx-auto px-6 lg:px-14">

                {/* ── Top row: Logo left, Social right ── */}
                <div className="flex items-start justify-between pt-10 pb-6">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <img className="w-16 h-16 lg:w-20 lg:h-20 object-contain" src={bike} alt="SpeedX Logo" />
                        <h1 className="text-2xl italic font-bold text-sky-500 -ml-1">SpeedX</h1>
                    </div>

                    {/* Social */}
                    <div className="text-right">
                        <h2 className="text-white font-bold uppercase tracking-widest text-sm mb-4">
                            Connect With Us
                        </h2>
                        <div className="flex gap-3 justify-end">
                            {socialIcons.map(({ icon, label }) => (
                                <button
                                    key={label}
                                    aria-label={label}
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg transition-all duration-200 cursor-pointer"
                                    style={{
                                        background: 'rgba(255,255,255,0.08)',
                                        border: '1px solid rgba(255,255,255,0.12)',
                                    }}
                                    onMouseEnter={e => {
                                        (e.currentTarget as HTMLButtonElement).style.background = 'rgba(56,189,248,0.25)';
                                        (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(56,189,248,0.5)';
                                    }}
                                    onMouseLeave={e => {
                                        (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.08)';
                                        (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.12)';
                                    }}
                                >
                                    {icon}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Divider ── */}
                <div className="w-full h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />

                {/* ── Showrooms heading ── */}
                <div className="text-center pt-10 pb-8">
                    <h2 className="text-white text-2xl lg:text-3xl font-bold tracking-wide">Our Showrooms</h2>
                    <div className="mx-auto mt-3 w-14 h-[3px] rounded-full bg-sky-500" />
                </div>

                {/* ── Location cards grid ── */}
                {/* ── Location cards grid ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-12">
                    {locations.map((loc, idx) => (
                        <div
                            key={idx}
                            className="rounded-xl p-5 transition-all duration-300 cursor-default group relative overflow-hidden"
                            style={{
                                background: 'rgba(255,255,255,0.04)',
                                border: '1.5px solid rgba(255,255,255,0.08)',
                                backdropFilter: 'blur(4px)',
                            }}
                            onMouseEnter={e => {
                                (e.currentTarget as HTMLDivElement).style.border = '1.5px solid rgba(56,189,248,0.7)';
                                (e.currentTarget as HTMLDivElement).style.background = 'rgba(56,189,248,0.07)';
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget as HTMLDivElement).style.border = '1.5px solid rgba(255,255,255,0.08)';
                                (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.04)';
                            }}
                        >
                            {/* Top glow line — inside overflow:hidden so it clips to rounded corners */}
                            <span className="absolute top-0 left-0 h-[2px] bg-sky-400 transition-all duration-500 w-0 group-hover:w-full" />

                            {/* Icon */}
                            <div
                                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                                style={{ background: 'rgba(255,255,255,0.08)' }}
                            >
                                <RiCustomerService2Fill className="text-gray-300 text-xl" />
                            </div>

                            {/* Branch name */}
                            <h3 className="text-white font-bold uppercase text-sm tracking-wide mb-3 leading-tight">
                                {loc.branchName}
                            </h3>

                            {/* Phone */}
                            <div className="flex items-center gap-2 mb-3">
                                <div
                                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                                    style={{ background: 'rgba(255,255,255,0.15)' }}
                                >
                                    <MdOutlineWifiCalling3 className="text-white text-xs" />
                                </div>
                                <p className="text-white font-semibold text-sm">{loc.phone}</p>
                            </div>

                            {/* Address */}
                            <div className="text-gray-400 text-xs leading-relaxed space-y-0.5">
                                <p>{loc.area}</p>
                                <p>{loc.addressLine}, {loc.city}</p>
                                <p>{loc.district}, {loc.postalCode}</p>
                                <p>{loc.country}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Bottom bar ── */}
                <div
                    className="border-t flex flex-wrap justify-center lg:justify-evenly gap-4 py-6 text-sm font-semibold text-gray-300"
                    style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                >
                    {['Servicing', 'Privacy Policy', 'Terms & Conditions'].map((item) => (
                        <span
                            key={item}
                            className="cursor-pointer hover:text-sky-400 transition-colors duration-200 relative pb-1 group"
                        >
                            {item}
                            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-sky-400 transition-all duration-300 group-hover:w-full" />
                        </span>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;