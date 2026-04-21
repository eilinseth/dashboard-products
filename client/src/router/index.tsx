import {createBrowserRouter} from "react-router-dom"
import App from "../App"
import Products from "../pages/Products"
import MainDashboard from "../components/MainDashboard"
import Product from "../pages/Product"
import Categories from "../pages/Categories"
import AddProduct from "../pages/AddProduct"
import EditProduct from "../pages/EditProduct"

const router = createBrowserRouter ([
    {
        path:"/",
        element : <App/>,
        children : [
            {index:true,element:<MainDashboard />},
            {path:"products",element:<Products />},
            {path:"products/:id",element:<Product />},
            {path:"products/new",element:<AddProduct />},
            {path:"/categories",element:<Categories />},
            {path:"products/edit/:id",element:<EditProduct />}
        ]
    }
])

export default router