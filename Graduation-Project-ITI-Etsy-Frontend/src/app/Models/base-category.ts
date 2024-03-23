export interface BaseCategory {
    id : number,
    nameEN : string,
    nameAR : string
}


export interface IBaseCategoryAPI {
    count : number,
    entities : BaseCategory[],
    message :string
}
