import { useState } from "react";
import { Link } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "../../components/ui/button";
import Loader from "@/components/Loader/Loader";
import OrderTable from "@/components/common/Orders/OrderTable";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetMyOrdersQuery } from "@/redux/features/common/orderManagementApi";
import { GrPowerReset } from "react-icons/gr";
const MyOrders = () => {
    const user = useAppSelector(selectCurrentUser);
    const [activeTab, setActiveTab] = useState("All");
    const [resetButtonSpinning, setResetButtonSpinning] = useState(false);
    const queryParams = [];
    const [mode, setMode] = useState('seller');
    if (activeTab !== 'All') {
        queryParams.push({ name: 'status', value: activeTab });
    }
    if (mode) {
        queryParams.push({ name: 'filterBy', value: mode }, { name: 'email', value: user?.email });
    }
    const { data: orderData, isFetching } = useGetMyOrdersQuery(queryParams);
    const data = orderData?.data;
    const tabs = ["All", "Cancelled", "Delivered", "Pending", "Returned"];
    const handleResetButton = () => {
        setResetButtonSpinning(true);
        setActiveTab("All");
        setMode('seller');
        setTimeout(() => {
            setResetButtonSpinning(false);
        }, 1000);
    }
    if (isFetching) return <Loader />;
    return (
        <div className="pt-5 px-4 2xl:px-10">
            {/* Heading */}
            <div className="mb-4">
                <h2 className="text-2xl font-semibold">My {mode === 'seller' ? 'Received' : 'Pressed'} Orders | Customer</h2>
                <p className="text-lg text-gray-500">{mode === 'seller' ? 'Manage, update, or delete customer orders from here.' : 'Cancel or retrun your orders from here.'}</p>
            </div>
            {/* Tabs */}
            <div className="flex flex-wrap gap-2  mb-4">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-1.5 text-sm font-medium transition duration-200 border-b-2
                                    ${activeTab === tab
                                ? `border-b-2 border-sky-400`
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Search and Filter */}
            <div className="flex items-center gap-3 mb-5 flex-wrap">
                {/* Search */}
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pt-0.5">
                        <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none">
                            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                    </span>
                    <input
                        type="text"
                        placeholder="Search Products..."
                        className="pl-10 w-[250px] py-1 rounded-sm border border-gray-300 text-sm text-gray-700 placeholder:text-sm bg-white focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                </div>

                {/* Select filter */}
                <Select onValueChange={(value) => setMode(value)}>
                    <SelectTrigger className="w-[120px] h-[32px]">
                        <SelectValue placeholder={mode === 'seller' ? 'Received' : 'Pressed'} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem className="hover:bg-sky-500 data-[state=checked]:bg-sky-400 data-[state=checked]:text-white" value="seller">Received</SelectItem>
                        <SelectItem className="hover:bg-sky-500  data-[state=checked]:bg-purple-600 data-[state=checked]:text-white" value='buyer'>Pressed </SelectItem>
                    </SelectContent>
                </Select>
                <Button onClick={handleResetButton} className="h-[32px] bg-sky-400 text-white px-2.5  flex gap-1"><GrPowerReset className={`${resetButtonSpinning ? 'animate-spin' : 'animate-none'}`} />Reset</Button>

            </div>
            {
                (data?.length ?? 0) > 0 ?
                    <>
                        <OrderTable data={data} />
                    </>
                    :
                    <div className="border-t flex items-center justify-center mt-12 py-10 rounded-sm ">
                        <aside className="mt-4 text-center">
                            <p className="text-2xl font-semibold">Order is Empty</p>
                            <p className="text-gray-500 text-lg py-5">Looks like you haven't added anything yet.</p>
                            <Link to='/'>
                                <Button className="bg-sky-400 hover:bg-sky-500 rounded-full py-3 px-4 text-[15px]">
                                    Continue Shopping
                                </Button>
                            </Link>
                        </aside>
                    </div>
            }
        </div>
    );
};

export default MyOrders;
