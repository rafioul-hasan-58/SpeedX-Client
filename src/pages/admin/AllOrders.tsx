
import LatestOrders from "../segments/admin/LatestOrders";
const AllOrders = () => {
    return (
        <div className="px-4">
            <h2 className="text-2xl font-semibold">All Customer Orders | Admin</h2>
            <p className="text-lg text-gray-500">Manage, update, or delete customer orders from here.</p>
            <LatestOrders />
        </div>
    );
};

export default AllOrders;