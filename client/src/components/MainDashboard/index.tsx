import { useQuery } from "@tanstack/react-query"
import { getProducts } from "../../api/getProducts"
import type { product } from "../../types"
import { formatDistanceToNowStrict} from "date-fns"
import { useNavigate } from "react-router-dom"

function MainDashboard(){
    const {data = [],isLoading} = useQuery<product[]>({
        queryKey:['products'],
        queryFn : () => getProducts()
    })
    const navigate = useNavigate()


    const lowStock = data.filter(product => product.stock <=10)
    const recentProduct = [...data].sort((a,b)=>new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0,3)
    const stockZero = data.filter(product => product.stock === 0)
    console.log(data)

    if (isLoading) ( <div className="top-1/2 -translate-x-1/2 z-30">Loading ...</div>)

    return(
        <main className="mt-10 ">
            <section className="grid grid-cols-2 items-start  gap-4 w-3/4 mx-auto">
                <div className="border-2 font-semibold p-2 text-center text-xl bg-[#052E16] text-[#4ADE80]">Total Stock <br /> {data? data?.length :"8"}</div>
                <div className="border-2  font-semibold p-2 text-center text-xl bg-[#422006] text-[#FACC15]">Low Stock <br /> {data?.filter(product =>product.stock <=10).length}</div>
                <div className="border-2 p-2 col-span-2 text-center text-xl w-[60%] justify-self-center bg-[#450A0A] text-[#F87171] font-semibold">Out of Stock <br />{data?.filter(product => product.stock === 0).length}</div>
            </section>

            <section className="mt-10 px-4">
                <p className="text-xl font-semibold mb-4 text-[#E5E7EB]">Recent Product :</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {recentProduct.map(product => (
                        <div className="w-full shadow-xl bg-[#1F2937] pl-1.5 rounded-xl py-1.5 cursor-pointer" key={product.id} onClick={() => navigate(`/products/${product.id}`)}>
                            <div className="flex gap-3">
                                <div className="w-26 h-22 rounded-xl overflow-hidden">
                                    <img src={product.image_url || "https://loremflickr.com/300/300/food" } onError={(e) =>{
                                        e.currentTarget.src = "https://loremflickr.com/300/300/food"
                                    }} />
                                </div>
                                <div className="flex flex-col gap-1">
                                    
                                        <div className="font-bold text-base text-[#E5E7EB]">{product.name}</div>
                                        <div className="text-sm text-[#9CA3AF]">Added time : <p className="inline font-semibold">{formatDistanceToNowStrict(new Date(product.created_at.replace(" ","T")),{addSuffix:true})} </p> </div>
                                        <div className="text-sm text-[#9CA3AF]">{product.description}</div>
                                    
                                </div>
                            </div>
                        </div>
                    ))}

                </div>

            </section>

            <section className="mt-10 px-4 ">
                <p className="text-xl font-semibold mb-4 text-[#E5E7EB]">Low Stock List :</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {lowStock.slice(0,4).map(product =>(
                        <div key={product.id} className="w-full shadow-xl bg-[#1F2937] pl-1.5 rounded-xl py-1.5 ">
                            <div className="flex gap-3">
                                <div className="w-26 h-22 rounded-xl overflow-hidden">
                                    <img src={product.image_url || "https://loremflickr.com/300/300/food"}  onError={(e =>{
                                        e.currentTarget.src = "https://loremflickr.com/300/300/food"
                                    })} />
                                </div>
                                <div className="flex flex-col gap-2 items-center justify-center">
                                    <div className="">
                                        <div className="text-base text-[#E5E7EB] font-bold">{product.name}</div>
                                        <div className=" text-sm text-[#9CA3AF]">Stock remaining : <p className="font-semibold inline">{product.stock}</p></div>
                                    </div>
                                    <button className="bg-[#3B82F6]  px-1  rounded-lg font-semibold w-32 cursor-pointer text-sm text-white ">-Update Product-</button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {lowStock.length >=5 ? <button className="block cursor-pointer font-semibold text-blue-600 text-xl mx-auto " onClick={() => navigate("/products?stock=low")}>View All</button> : "" }
                </div>
            </section>

            <section className="mt-10 px-4">
                <p className="font-semibold text-xl mb-4 text-[#E5E7EB]">Out of Stock :</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stockZero.slice(0,4).map(product => (
                    <div className="w-full shadow-xl bg-[#1F2937] pl-1.5 py-1.5 rounded-xl" key={product.id}>
                            <div className="flex gap-3">
                                <div className="w-26 h-22 overflow-hidden rounded-xl">
                                    <img src={product.image_url || "https://loremflickr.com/300/300/food"} onError={(e) => {
                                        e.currentTarget.src = "https://loremflickr.com/300/300/food"
                                    }} />
                                </div>
                                <div className="flex flex-col gap-2 items-center justify-center">
                                    <div>
                                        <div className="font-bold text-base text-[#E5E7EB]">{product.name}</div>
                                        <div className="text-sm  text-[#F87171]">Stock Remaining : <p className="font-semibold inline">{product.stock}</p></div>
                                    </div>
                                    <button className="bg-[#3B82F6]  px-1  rounded-lg font-semibold w-32 cursor-pointer text-sm text-white ">-Update Product-</button>
                                </div>
                            </div>
                        </div>
                ))}
                {stockZero.length >= 5 ? <button className="block cursor-pointer font-semibold text-blue-600 text-xl mx-auto ">View All</button> : ""}
                </div>
            </section>
        </main>
    )
}

export default MainDashboard