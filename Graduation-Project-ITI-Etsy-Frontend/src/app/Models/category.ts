export interface Category {
    id : number,
    nameEN : string,
    nameAR : string,
    categoryImage:string,
    baseCategoryId : number
}

export interface ICategoryAPI {
    entity: Category
    count : number,
    entities : Category[],
    message :string
}

export interface IOneCategoryAPI {
    entity : Category,

    message : string
}