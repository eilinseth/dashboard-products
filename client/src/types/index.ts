export interface product {
    id : number
    name : string
    price : number
    stock : number
    description : string
    category : string
    category_id : number
    image_url : string
    created_at:string
}

export interface categories {
    id : number
    name : string
    Total_Item : number
}

export interface ProductBody {
    name : string
    price : number
    stock : number
    category : number
    image : FileList
    description : string
}
