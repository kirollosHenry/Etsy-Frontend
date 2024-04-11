export interface Products {
    productId: number,

    productNameEN: string,

    productNameAR: string,

    productPrice: number,

    productStock: number,

    productRating: number,

    productPublisher: string,

    productDescriptionEN: string,

    productDescriptionAR: string,

    productImage: string,

    categoryID: number
}

export interface IProductAPI {
    count : number ,

    entities : Products[],

    message : string
}

export interface IOneProductAPI {

    entity : Products,

    message : string
}

export interface ProductChangeStockAPI{
    
    productId: number,
    
    productStock : number
}