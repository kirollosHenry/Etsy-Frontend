export interface BaseCategory {
    id : number,
    nameEN : string,
    nameAR : string,
    baseCategoryImage : string
}


export interface IBaseCategoryAPI {
    count : number,
    entities : BaseCategory[],
    message :string
}
