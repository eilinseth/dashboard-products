import ProductForm from "../../components/ProductForm";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { addProduct } from "../../api/addProduct";
import toast from "react-hot-toast";



function AddProduct (){
    const client = useQueryClient()
    const mutation = useMutation({
        mutationFn:addProduct,
        onSuccess : () => {
            toast.success("Product successfuly added")
            client.invalidateQueries({queryKey:['products']})
        },
        onError : (error) =>{
            toast.error("Product failed to add")
            console.error(error.message)

        }
    })

    function onSubmit (data:FormData){
        mutation.mutateAsync(data)
    }


    return(
       <ProductForm  onSubmit={onSubmit} title="Add Product"/>
    )
}

export default AddProduct