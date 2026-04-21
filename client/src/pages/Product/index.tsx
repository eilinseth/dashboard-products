import { useEffect, useState } from "react"
import { getProduct } from "../../api/getProduct"
import type { product } from "../../types"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { deleteProduct } from "../../api/deleteProduct"
import { useQueryClient } from "@tanstack/react-query"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

function Product (){
    const {id} = useParams()
    const productId = Number(id)
    const [open,setIsOpen] = useState(false)
    const [selectedId , setSelectedId] = useState<number | null>(null)
    const client = useQueryClient()
    const {data:product,isLoading} = useQuery<product>({
        queryKey:['product',productId],
        queryFn : ()=> getProduct(productId)
    })
    const navigate = useNavigate()
    const mutation = useMutation({
        mutationFn:deleteProduct,
        onSuccess : () =>{
            toast.success("Product successfuly deleted")
            client.invalidateQueries({queryKey:['products']})
            
        },
        onError : (error) =>{
            toast.error("Product failed to delete")
            console.error(error.message)
        }
    })

    function deleteItem (id:number){
        mutation.mutate(id)
        setIsOpen(false)
        navigate(-1)
    }

    useEffect(() => {
     if(open===true){
        document.body.style.overflow="hidden"
     }else{
        document.body.style.overflow=""
     }   
    },[open])
    
    if(isLoading) return ( <div className="absolute left-1/2 -translate-x-1/2">Loading...</div> )
    if(!product) return <div className="absolute left-1/2 -translate-x-1/2">Error...</div> 
    console.log(product)
    return(
        
        <section className="text-xl mt-2 text-[#E5E7EB] flex flex-col gap-4 pb-10 relative">
            <div className="w-full ">
                <img src={product?.image_url || "https://loremflickr.com/300/300/food"} className="w-full object-cover max-h-100" onError={(e) => e.currentTarget.src="https://loremflickr.com/300/300/food"} />
            </div>
            <div className="flex flex-col px-2">
                <div className="font-bold text-3xl">{product?.name} </div>
                <div className="text-2xl text-green-400">{new Intl.NumberFormat("id-ID",{
                    currency : "IDR",
                    style :"currency",
                    maximumFractionDigits:0
                }).format(Number(product.price))}</div>
            </div>
            <div className="flex flex-col px-2 gap-4">
                <div className="grid grid-cols-[150px,1fr] gap-y-2">
                    <div className="font-semibold text-lg text-[#9CA3AF]">Added date : </div>
                    <div className="text-slate-200">{new Date(product.created_at).toLocaleDateString("id-ID")}</div>
                    
                    <div className="font-semibold text-lg text-[#9CA3AF]">Category : </div>
                    <div className="text-slate-200">{product.category}</div>
                </div>
                <div className="text-base min-h-15">{product.description}</div>
            </div>
            <div className="flex justify-end gap-3 px-4 mt-7">
                <button className="bg-blue-600 rounded-lg px-3 py-1 cursor-pointer text-white font-semibold" onClick={() => navigate(`/products/edit/${product.id}`)}>Edit</button>
                <button className="bg-red-600 rounded-lg px-3 py-1 cursor-pointer text-white font-semibold" onClick={() => {
                    setIsOpen(true)
                    setSelectedId(product.id)
                    }}>Delete</button>
            </div>

            {open && <div className="fixed inset-0 px-2 py-2 -translate-x-1/2 top-[40%] left-1/2 bg-slate-600 h-30 w-100 shadow-md shadow-blue-500">
                <div className="flex items-center justify-center flex-col gap-4 mt-3">  
                    <div>Are you sure you want to delete this item ?</div> 
                    <div className="flex gap-3 items-center w-full justify-end px-2">
                        <button className="cursor-pointer bg-white text-black py-0.5 px-2 rounded-lg" onClick={() => setIsOpen(false)}>Close</button> 
                        <button className="cursor-pointer bg-red-500 text-white py-0.5 px-2 rounded-lg" onClick={() => deleteItem(selectedId!)}>Delete</button> 
                    </div>
                </div>
            </div>}
        </section >
    )
}

export default Product