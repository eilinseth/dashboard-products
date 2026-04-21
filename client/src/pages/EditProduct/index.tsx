import { useParams } from "react-router-dom";
import ProductForm from "../../components/ProductForm";
import { editProduct } from "../../api/editProduct";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getProduct } from "../../api/getProduct";
import { useQuery } from "@tanstack/react-query";


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
            toast.error("Update failed")
            console.error(error)
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