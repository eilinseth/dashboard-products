import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../api/getCategories";
import type { categories } from "../../types";
import { useNavigate } from "react-router-dom";


function Categories () {
    const {data,isLoading} = useQuery<categories[]>({
        queryKey : ['categories'],
        queryFn : getCategories
    })
    const navigate = useNavigate()

    console.log(data)
    if(isLoading) return <div className="absolute -translate-x-1/2 left-1/2">Loading ...</div>
    return(
        <section className="mt-4 px-4 w-full pb-20">
            <div className="grid grid-cols-1 gap-5">
                {data?.map(category => (
                <div className="w-full bg-[#2A3A50] h-22 rounded-lg shadow-md shadow-[#040438] cursor-pointer hover:bg-[#3B4F6B]" key={category.id} onClick={() => navigate(`/products?category=${category.id}`)}>
                    <div className="flex flex-col px-4 py-3 gap-2.5 text-[#E5E7EB]">
                        <div className=" text-2xl font-semibold">{category.name}</div>
                        <div className="text-base opacity-80">{category.Total_Item} Products</div>
                    </div>
                </div>
                ))}
            </div>
        </section>
    )
}

export default Categories