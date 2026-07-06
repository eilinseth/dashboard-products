import { useParams } from "react-router-dom";
import ProductForm from "../../components/ProductForm";
import { editProduct } from "../../api/editProduct";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getProduct } from "../../api/getProduct";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


function EditProduct (){
    const {id} = useParams()
    const productId = Number(id)
    const client = useQueryClient()
    const mutation = useMutation({
        mutationFn:editProduct,
        onSuccess : () => {
            toast.success("Product updated")
            client.invalidateQueries({queryKey:['product',productId]})
            client.invalidateQueries({queryKey:['products']})
        },onError : (error) => {
            if(axios.isAxiosError(error)){
                const message = error.response?.data?.message || "Failed to update product";
                toast.error(message);
            }else{
                toast.error("Something went wrong");
            }
        }
    })

    const {data:product} = useQuery({
        queryKey : ['product',productId],
        queryFn : () => getProduct(productId)
    })

    function onSubmit(data:FormData){
        const id = productId
        mutation.mutateAsync({data,id})
    }


    return(
        <ProductForm title="Edit Product" onSubmit={onSubmit} product={product} />
    )
}

export default EditProduct