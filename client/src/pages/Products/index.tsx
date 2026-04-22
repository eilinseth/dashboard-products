import { useQuery } from "@tanstack/react-query"
import { getProducts } from "../../api/getProducts"
import type { product } from "../../types"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Filter } from "lucide-react"
import { SortDescIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { RotateCcw } from "lucide-react"
import { X } from "lucide-react"

type filterParams = {
    category ? : string
    minPrice ? : string
    maxPrice ? : string
}

function Products () {
    const [searchParams] = useSearchParams()
    const params = Object.fromEntries(searchParams)

    const {data = [] , isLoading} = useQuery<product[]>({
        queryKey:["products",{params}],
        queryFn: () => getProducts(params)
    })
    const [filterState,setFilterState] = useState(false)
    const [sortState , setSortState] = useState(false)
    const [minPrice , setMinPrice] = useState("")
    const [maxPrice , setMaxPrice] = useState("")
    const [selected,setSelected] = useState(0)
    const [category,setCategory] = useState<number | null>(null)

    console.log(params)
    const navigate = useNavigate()

    function onSubmit(){
        const params:filterParams = {}
        if(category) params.category = String(category)
        if(minPrice) params.minPrice = String(minPrice)
        if(maxPrice) params.maxPrice = String(maxPrice)

        const query = new URLSearchParams(params).toString()
        navigate(`/products?${query}`)
        setFilterState(false)
    }

    useEffect(() => {
        if(filterState){
            document.body.style.overflow ="hidden"
        }else{
            document.body.style.overflow =""
        }
    })
    if(isLoading) return ( 
    <div className="absolute left-1/2 -translate-x-1/2">Loading ...</div>
    )

    return(
        <section className="w-full py-5 px-4">
            <div className="text-white flex gap-3 mb-3 justify-end">
                <SortDescIcon className="cursor-pointer"/>
                <Filter className="cursor-pointer" onClick={() => setFilterState(true)}/>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {data.map(product => (
                    <div key={product.id} className="text-[#E5E7EB] bg-[#2A3A50] pb-3 flex flex-col gap-2 rounded-t-2xl rounded-b-lg overflow-hidden cursor-pointer h-66 shadow-lg shadow-slate-800" onClick={()=>navigate(`/products/${product.id}`)}>
                        <div className="border border-black h-3/4 overflow-hidden ">
                            <img src={product.image_url || "https://loremflickr.com/300/300/food"} onError={(e) => e.currentTarget.src = "https://loremflickr.com/300/300/food"} className="object-cover hover:scale-120 transition duration-400 overflow-hidden"/>
                        </div>
                        <div className="flex flex-col px-1">
                            <div className="text-xl font-bold "> {product.name}</div>
                            <div className="text-base font-semibold text-slate-400">Added : {new Date(product.created_at).toLocaleDateString("id-ID")}</div>
                            <div className={product.stock > 0 ? "text-base font-semibold text-slate-400" : "text-base font-semibold text-red-400"}>Stock : {product.stock}</div>
                        </div>
                    </div>
                ))}
            </div>

            {filterState && (<div className="z-100 fixed bottom-0 w-full h-100 bg-slate-100 text-black rounded-t-xl overflow-y-scrol left-0 right-0">
                <div className="px-4 py-4 flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-semibold tracking-wider">Filter</h1>
                    <div className="flex gap-3">
                        <RotateCcw className="cursor-pointer " onClick={() => {
                            setMinPrice("")
                            setMaxPrice("")
                            setCategory(null)
                            setSelected(0)
                            navigate("/products")
                            setFilterState(false)
                        }} />
                        <X className="cursor-pointer size-6" onClick={() => setFilterState(false)} />
                    </div>
                    </div>
                    <div className="font-semibold text-lg">Category</div>
                    <div className="font-semibold flex gap-4">
                        <button className={selected === 1 ? "text-left text-slate-100 rounded-lg w-fit px-3 py-1 cursor-pointer bg-black": "text-left text-slate-700 rounded-lg bg-slate-200 w-fit px-3 py-1 cursor-pointer"} onClick={() => {
                            setSelected(1)
                            setCategory(1)
                            }}>Food</button>
                        <button className={selected === 2 ? "text-left text-slate-100 rounded-lg w-fit px-3 py-1 cursor-pointer bg-black": "text-left text-slate-700 rounded-lg bg-slate-200 w-fit px-3 py-1 cursor-pointer"} onClick={() => {
                            setSelected(2)
                            setCategory(2)
                            }}>Drink</button>
                        <button className={selected === 3 ? "text-left text-slate-100 rounded-lg w-fit px-3 py-1 cursor-pointer bg-black": "text-left text-slate-700 rounded-lg bg-slate-200 w-fit px-3 py-1 cursor-pointer"} onClick={() => {
                            setSelected(3)
                            setCategory(3)
                            }}>Electronic</button>
                        <button className={selected === 4 ? "text-left text-slate-100 rounded-lg w-fit px-3 py-1 cursor-pointer bg-black": "text-left text-slate-700 rounded-lg bg-slate-200 w-fit px-3 py-1 cursor-pointer"} onClick={() => {
                            setSelected(4)
                            setCategory(4)
                            }}>Tool</button>
                    </div>
                    <div className="font-semibold text-lg">Price</div>
                    <div className="font-semibold flex gap-4">
                        <div className="flex flex-col gap-2">
                        Min Price
                        <input type="number" className="bg-slate-300 rounded-lg px-2 text-slate-700 w-40 shadow-md" value={minPrice} onChange={(e) => setMinPrice(e.target.value)
                        } />
                        </div>
                        <div className="mt-8"> - </div>
                        <div className="flex flex-col gap-2">
                        Max Price
                        <input type="number" className="bg-slate-300 rounded-lg px-2 text-slate-700 w-40 shadow-md" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                        </div>
                    </div>
                    <div className="flex justify-center ">
                        <button className="fixed bottom-10 w-60 bg-slate-900 text-slate-100 font-medium px-2 py-1 rounded-xl cursor-pointer " onClick={onSubmit}>Apply Filter</button>
                    </div>
                </div>
            </div>) }
            

        </section>
    )
}

export default Products