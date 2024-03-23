export interface Category {
    id : number,
    nameEN : string,
    nameAR : string,
    baseCategoryId : number
}

export interface ICategoryAPI {
    count : number,
    entities : Category[],
    message :string
}