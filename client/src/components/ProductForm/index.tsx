import { useForm, useWatch, } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import type { ProductBody } from "../../types";
import { useNavigate } from "react-router-dom";
import { ArrowLeftCircleIcon } from "lucide-react";
import type { product } from "../../types";
import { useEffect } from "react";

type formProp = {
  onSubmit : (data:FormData) => void
  title : string
  product? : product

}


const ProductForm:React.FC<formProp> = ({onSubmit,title,product}) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ProductBody>({
    defaultValues : {
      name : "",
      price : 1000,
      stock : 1,
      category : 1,
      description : ""
    }
  });
  const navigate = useNavigate();

  const image = useWatch({name:"image",control})

  const formSubmit: SubmitHandler<ProductBody> = async (data:ProductBody) => {
    const formData = new FormData()
    formData.append("name",data.name)
    formData.append("price",data.price.toString())
    formData.append("stock",data.stock.toString())
    formData.append("description",data.description)
    formData.append("image",data.image?.[0])
    formData.append("category",data.category.toString())
    onSubmit(formData)
    reset();
    navigate(-1);
  };
  useEffect(() => {
    if(product){
      reset({
        name : product.name,
        price : product.price,
        stock : product.stock,
        category : product.category_id,
        description : product.description,

      })
    }
  },[product,reset])
  


  console.log(image)


  return (
    <div className="w-full px-4 text-[#E5E7EB] fixed inset-0 bg-[#111827] z-50 overflow-y-auto pb-10">
      <div className="text-center text-3xl mt-7 font-semibold">{title}</div>
      <ArrowLeftCircleIcon
        className="-mt-9 ml-4 size-10 cursor-pointer"
        onClick={() => navigate(-1)}
      />

      <form
        className="flex w-[80%] m-auto gap-6 justify-center flex-wrap mt-10 px-6"
        onSubmit={handleSubmit(formSubmit)}
      >
        <div className="w-lg flex  flex-col gap-2">
          <label htmlFor="" className="text-lg font-bold">
            Product Name
          </label>
          <input
            {...register("name", {
              required: "Name is required",
              setValueAs: (value) => value.trim(),
              minLength:{value:4,message:"Minimal character is 4"},
              maxLength:{value:40,message:"Maximal character is 40"}
            })}
            type="text"
            className="bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/70 focus:border-blue-500 transition py-1 px-2 text-black"
            placeholder="Name ..."
          />
          {errors.name && <div className="text-red-400 ">{errors.name.message}</div> }
        </div>
        <div className="w-lg flex  flex-col gap-2">
          <label htmlFor="" className="text-lg font-bold">
            Price
          </label>
          <input {...register("price",{
            required:true,
            valueAsNumber:true,
            min:{value:1000,message:"Minimal price is Rp.1000"},
            validate : v => !Number.isNaN(v) || "Must be a number"
          })}
            type="number"
            className="bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/70 focus:border-blue-500 transition py-1 px-2 text-black"
            placeholder="Price ..."
          />
          {errors.price && <div className="text-red-500">{errors.price.message}</div> }
        </div>
        <div className="w-lg flex  flex-col gap-2">
          <label htmlFor="" className="text-lg font-bold">
            Stock
          </label>
          <input {...register("stock",{
            required:true,
            valueAsNumber:true,
            min:{value:0,message:"Stock cannot lower than 0"},
            validate : value => !Number.isNaN(value) || "Must be a number"
          })}
            type="number"
            className="bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/70 focus:border-blue-500 transition py-1 px-2 text-black"
            placeholder="Stock ..."
          />
          {errors.stock && <div className="text-red-500">{errors.stock.message}</div> }
        </div>
        <div className="w-lg flex  flex-col gap-2">
          <label htmlFor="" className="text-lg font-bold">
            Description
          </label>
          <textarea {...register("description",{
            maxLength:{value:200,message:"Maximal character reached"}
          })}
            className="h-20 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/70 focus:border-blue-500 transition py-1 px-2 text-black"
            placeholder="Description ..."
          />
          {errors.description && <div className="text-red-500">{errors.description.message}</div> }
        </div> 
        <div className="w-lg flex  gap-4">
          <div className="text-lg font-bold">Image</div>
          <label htmlFor="image" className="cursor-pointer bg-gray-700 px-3 py-1 rounded font-semibold">
            {image?.[0]?.name || "Upload Image"}
          </label>
            <input  {...register("image")}
              type="file"
              id="image"
              className="hidden"

            />
          {errors.image && <div className="text-red-500">{errors.image.message}</div> }
        </div> 
        <div className="w-lg flex  gap-2 mt-2">
          <div className="text-lg font-bold">Category</div>
          <select {...register("category",{required:"Category is required"})}
            
            className="font-bold text-lg cursor-pointer border border-white rounded-lg text-center w-35"
          >
            <option value="" className="text-black text-center">
              -
            </option>
            <option value="1" className="text-black">
              Food
            </option>
            <option value="2" className="text-black">
              Drink
            </option>
            <option value="3" className="text-black">
              Electronic
            </option>
            <option value="4" className="text-black">
              Tool
            </option>
          </select>
        </div>
        {errors.category && <div className="text-red-500">{errors.category.message}</div> }
        <button className="border px-2 py-1 cursor-pointer bg-green-400 font-bold text-black w-full rounded-lg">
          Submit
        </button>
      </form>
    </div>
  );
}

export default ProductForm;
