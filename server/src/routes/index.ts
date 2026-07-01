import { Router } from "express";
import { getProducts,getProduct,addProduct,updateProduct,deleteProduct,getCategories,register,login,getMe,updateUsername,logout,updatePassword} from "../controller";
import auth from "../middleware"
import multer from "multer"

const router = Router()

const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,'uploads/')
    },
    filename:(req,file,cb) =>{
        const unique = Date.now() + '-' + file.originalname
        cb(null,unique)
    }
})
const fileFilter = (req,file,cb) => {
    const allowedTypes = ['image/jpeg','image/jpg','image/png']
    if (allowedTypes.includes(file.mimetype)){
        cb(null,true)
    }else{
        cb(new Error('File must be image (jpg/png)'),false)
    }
}


const upload = multer({
    storage,
    limits : {
        fileSize : 2 * 1024 * 1024
    },
    fileFilter
})


router.get("/products",getProducts)
router.get("/products/:id",getProduct)
router.post("/products",upload.single('image'),addProduct)
router.put("/products/:id",upload.single('image'),updateProduct)
router.delete("/products/:id",deleteProduct)
router.get("/categories",getCategories)
router.post("/register",register)
router.post("/login",login)
router.post("/logout",auth,logout)
router.get("/me",auth,getMe)
router.patch("/user/username",auth,updateUsername)
router.patch("/user/password",auth,updatePassword)



export default router