export interface BaseCategory {
    id : number,
    nameEN : string,
    nameAR : string,
    baseCategoryImage : string
}


export interface IBaseCategoryAPI {
    entity: BaseCategory
    count : number,
    entities : BaseCategory[],
    message :string
}

export interface IOneBaseCategoryAPI {
    entity : BaseCategory,

    message : string
}
