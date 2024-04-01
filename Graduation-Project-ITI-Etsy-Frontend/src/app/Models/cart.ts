export interface AddCartDTO {
    cartID: number,
    productId : number,
    customerId: string,
    quantity: number
}


export interface GetAllCartDTO{
    cartID: number,

    customerId: string,

    productId: number,

    productNameEN:  string,

    productNameAR : string,

    productPrice : number,

    productStock: number,

    productRating: number,

    productPublisher: string,

    productDescriptionEN: string,

    productDescriptionAR: string,

    productImage: string,

    categoryID: number,

    quantity: number
}


export interface ICartAPI {
    count : number ,

    entities : GetAllCartDTO[],

    message : string
}

