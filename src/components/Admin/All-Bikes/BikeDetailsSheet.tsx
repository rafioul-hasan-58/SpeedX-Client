import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { IProduct } from "@/types/product.types";
import { Eye } from "lucide-react";
import moment from "moment";
const BikeDetailSheet = ({ bike }: { bike: IProduct }) => {
    return (
        <div className="">
            <Sheet>
                <SheetTrigger>
                    <Button className="bg-sky-400 hover:bg-sky-500 text-white h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                    </Button>
                </SheetTrigger>
                <SheetContent className="rounded-md m-4 mt-10 max-h-screen lg:h-[570px] overflow-y-auto">
                    <h1 className="text-xl font-semibold border-b pb-4 text-gray-600">Bike Details</h1>
                    <p className="text-gray-600">Bike</p>
                    <div className="">
                        <div>
                            <section className="flex gap-3 mt-2 border-b pb-4">
                                <img className="w-20 h-15 border rounded-md" src={bike?.images[0]} alt="img" />
                                <article>
                                    <p className="text-gray-500">{bike?.name.split(' ').slice(0, 4).join(' ')}</p>
                                    <p className="text-gray-500">Color: {bike?.color}</p>
                                </article>
                            </section>
                        </div>
                        <section className="text-[15px] border-b pb-5">
                            <article className="mt-3 flex justify-between">
                                <p className="text-gray-500 ">Created At</p>
                                <p className="mr-10">{moment.utc(bike.createdAt).format('D MMMM YYYY')}</p>
                            </article>
                            <article className="mt-3 flex justify-between">
                                <p className="text-gray-500 ">Stocks</p>
                                <p className="mr-10">{bike?.stocks} pcs</p>
                            </article>
                            <article className="mt-3 flex justify-between">
                                <p className="text-gray-500 ">Type</p>
                                <p className="mr-10">      {
                                    bike.stocks === 0 ? <p className='text-[12px] font-semibold px-2 rounded-full h-[22px] leading-5 border border-red-500 text-red-500'>Sold</p> : <span className={`text-[12px] font-semibold px-2 rounded-full h-[22px] leading-5 ${bike?.type === 'new'
                                        ? 'text-sky-500 border border-sky-500'
                                        : 'text-gray-600 border border-black'
                                        }`}>
                                        {bike?.type?.toUpperCase()}
                                    </span>
                                }</p>
                            </article>
                            <article className="mt-3 flex justify-between">
                                <p className="text-gray-500 ">Price</p>
                                <p className="mr-10 text-sky-500 font-semibold">BDT.{bike?.price}</p>
                            </article>
                        </section>
                        <section className="text-[15px] border-b pb-5">
                            <article className="mt-3 flex justify-between">
                                <p className="text-gray-500 ">Added By</p>
                                <p className="mr-10 text-sky-500">{bike?.addedBy}</p>
                            </article>
                            <article className="mt-3 flex justify-between">
                                <p className="text-gray-500 ">Brand Name</p>
                                <p className="mr-10 text-red-500 font-semibold">{bike?.brandName}</p>
                            </article>
                            <article className="mt-3 flex justify-between">
                                <p className="text-gray-500 ">Status</p>
                                <p className="mr-10  font-semibold">{bike?.instock ? <p className="text-green-500">Available</p> : <p className="text-red-500">Out of stock</p>}</p>
                            </article>
                            <article className="mt-3 flex justify-between">
                                <p className="text-gray-500 ">BikeType</p>
                                <p className="mr-10  font-semibold">{bike?.bikeType}</p>
                            </article>
                        </section>
                        <p className="pt-6 text-center text-sm text-gray-500 lg:mt-0 dark:text-gray-400">© Copyright 2023 Meraki UI. </p>

                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default BikeDetailSheet;