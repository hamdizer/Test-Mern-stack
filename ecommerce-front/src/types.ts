export interface Country{
    code:string,
    description:string,
}
export interface CountryPricing{
    price:number,
    currency:string,
}
export enum Role{
    ADMIN="admin",
    USER="user"

}
export interface Product{
    sku:string
    title:string,
    description:string,
    countryPrice?:CountryPricing[]
}
export interface User{
    email:string,
    firstName:string,
    lastName:string,
    tel_number:number,
    password:string,
    passwordConfirm:string,
    country?:Country,
    role:Role

}
export interface AddProductData{
    product:{
    sku:string
    title:string,
    description:string
    },
    countryPrice?:CountryPricing[]
}
export interface Credentials{
    email:String,
    password:String
}